import { GEMINI_API_KEY } from '../../configs/gemini-key.generated';

// Free-tier quotas are per Google project, shared by every visitor:
//   gemini-3.1-flash-lite  15 req/min, 500 req/day  <- primary
//   gemini-2.5-flash-lite  10 req/min,  20 req/day  <- only when primary is rate-limited
// Everything below exists to spend as few of those requests as possible.
const PRIMARY_MODEL = 'gemini-3.1-flash-lite';
const FALLBACK_MODEL = 'gemini-2.5-flash-lite';
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

// Per-visitor guards. They can't enforce the project-wide quota, but they stop
// one guest (or a stuck Enter key) from burning it for everyone.
const MIN_GAP_MS = 5000;
const DAILY_LIMIT_PER_VISITOR = 25;
const USAGE_KEY = 'phbb_concierge_usage';
const ANSWER_CACHE_KEY = 'phbb_concierge_answers_v1';

// Only the most recent turns are resent; the menu context already carries
// the facts, so long history just costs input tokens.
const HISTORY_TURNS = 6;

export interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

export interface ConciergeReply {
  reply: string;
  itemIds: string[];
}

export type ConciergeErrorCode = 'no-key' | 'throttled' | 'daily-limit' | 'rate-limited' | 'failed';

export class ConciergeError extends Error {
  constructor(
    readonly code: ConciergeErrorCode,
    // For 'throttled' / 'rate-limited': how long until a retry is worth it.
    readonly retryInMs = 0,
  ) {
    super(code);
  }
}

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    reply: { type: 'STRING' },
    itemIds: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['reply', 'itemIds'],
};

function systemPrompt(context: string): string {
  return `You are the Pahli Hill AI Concierge, the warm, concise digital host of Pahli Hill Bandra Bhai, an Indian restaurant and speakeasy in Fitzrovia, London.

Rules:
- Answer ONLY from the HOUSE DATA below. If the answer is not there, say you're not sure and suggest calling +44 20 8130 0101 or emailing reservations@pahlihillbandrabhai.com. Never invent dishes, prices, hours, allergens or policies.
- Allergens: quote exactly what the data declares and always remind the guest to tell staff about allergies. Never claim a dish is safe for an allergy the data doesn't cover.
- Keep replies to 1–3 short sentences, friendly, British English, no markdown.
- When you recommend or mention specific menu items, put their ids (the first column of the menu list) in itemIds, at most 4. Otherwise itemIds is [].
- Politely decline anything unrelated to the restaurant.

HOUSE DATA
${context}`;
}

export class GeminiChatApi {
  private lastSentAt = 0;
  private cooldownUntil = 0;

  get available(): boolean {
    return GEMINI_API_KEY.length > 0;
  }

  async ask(context: string, history: ChatTurn[], question: string): Promise<ConciergeReply> {
    if (!this.available) throw new ConciergeError('no-key');

    // The opening question of a chat has no history, so the same wording gets
    // the same answer: serve repeats (and the suggestion chips) from cache.
    const cacheKey = history.length === 0 ? this.normalise(question) : null;
    const cached = cacheKey ? this.readAnswer(cacheKey) : null;
    if (cached) return cached;

    const now = Date.now();
    if (now < this.cooldownUntil) {
      throw new ConciergeError('rate-limited', this.cooldownUntil - now);
    }
    if (now - this.lastSentAt < MIN_GAP_MS) {
      throw new ConciergeError('throttled', MIN_GAP_MS - (now - this.lastSentAt));
    }
    if (this.usedToday() >= DAILY_LIMIT_PER_VISITOR) {
      throw new ConciergeError('daily-limit');
    }

    this.lastSentAt = now;
    this.countRequest();

    const request = {
      systemInstruction: { parts: [{ text: systemPrompt(context) }] },
      contents: [
        ...history.slice(-HISTORY_TURNS).map((turn) => ({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }],
        })),
        { role: 'user', parts: [{ text: question }] },
      ],
    };

    // A guest only sees the "couldn't answer" notice if every attempt fails.
    // Transient errors (5xx, dropped connection, an empty or malformed
    // reply) get one retry on the primary model, then the fallback model.
    // A 429 skips straight to the fallback: retrying the same quota is futile.
    const attempts = [PRIMARY_MODEL, PRIMARY_MODEL, FALLBACK_MODEL];
    let rateLimitedMs = 0;

    for (let i = 0; i < attempts.length; i++) {
      const model = attempts[i];
      if (rateLimitedMs && model === PRIMARY_MODEL) continue;
      if (i > 0) await new Promise((resolve) => setTimeout(resolve, 600));

      let response: Response;
      try {
        response = await this.post(model, request);
      } catch (error) {
        console.warn(`[concierge] ${model} request failed`, error);
        continue;
      }

      if (response.status === 429) {
        rateLimitedMs = Math.max(rateLimitedMs, await this.retryDelay(response));
        continue;
      }
      if (!response.ok) {
        console.warn(`[concierge] ${model} HTTP ${response.status}`, await response.text());
        continue;
      }

      const reply = this.parse(await response.json());
      if (!reply) {
        console.warn(`[concierge] ${model} returned no usable answer`);
        continue;
      }

      if (cacheKey) this.writeAnswer(cacheKey, reply);
      return reply;
    }

    if (rateLimitedMs) {
      this.cooldownUntil = Date.now() + rateLimitedMs;
      throw new ConciergeError('rate-limited', rateLimitedMs);
    }
    throw new ConciergeError('failed');
  }

  private post(model: string, request: object): Promise<Response> {
    const generationConfig: Record<string, unknown> = {
      temperature: 0.4,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
    };
    // Gemini 3 models reason before answering, and that reasoning spends the
    // same maxOutputTokens; left unchecked it can crowd out the reply itself.
    // Gemini 2.5 Flash Lite doesn't reason by default and rejects this field.
    if (model.startsWith('gemini-3')) {
      generationConfig['thinkingConfig'] = { thinkingLevel: 'minimal' };
    }
    return window.fetch(`${ENDPOINT}/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({ ...request, generationConfig }),
    });
  }

  // Null means "nothing usable came back", which the caller retries.
  private parse(json: unknown): ConciergeReply | null {
    const candidate = (
      json as {
        candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[];
      }
    ).candidates?.[0];
    const text = (candidate?.content?.parts ?? [])
      .filter((p) => !p.thought)
      .map((p) => p.text ?? '')
      .join('')
      .trim();
    if (!text) return null;

    // JSON mode normally returns bare JSON, but tolerate ```json fences or
    // stray text around the object.
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      try {
        const parsed = JSON.parse(text.slice(start, end + 1)) as Partial<ConciergeReply>;
        if (typeof parsed.reply === 'string' && parsed.reply.trim()) {
          return {
            reply: parsed.reply.trim(),
            itemIds: Array.isArray(parsed.itemIds) ? parsed.itemIds.slice(0, 4).map(String) : [],
          };
        }
      } catch {
        // Fall through to the plain-text check below.
      }
    }

    // A plain-prose answer is still an answer; a half-written JSON blob isn't.
    return /^[{[]/.test(text) ? null : { reply: text, itemIds: [] };
  }

  // Google's 429 body carries a RetryInfo detail like {"retryDelay": "23s"}.
  private async retryDelay(response: Response): Promise<number> {
    try {
      const body = (await response.json()) as { error?: { details?: { retryDelay?: string }[] } };
      const delay = body.error?.details?.find((d) => d.retryDelay)?.retryDelay;
      const seconds = delay ? parseFloat(delay) : NaN;
      if (Number.isFinite(seconds)) return Math.ceil(seconds) * 1000;
    } catch {
      // Fall through to the default.
    }
    return 60_000;
  }

  private normalise(question: string): string {
    return question.toLowerCase().replace(/[^a-z0-9£ ]+/g, '').replace(/\s+/g, ' ').trim();
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private usedToday(): number {
    try {
      const usage = JSON.parse(localStorage.getItem(USAGE_KEY) ?? 'null') as
        | { day: string; count: number }
        | null;
      return usage?.day === this.today() ? usage.count : 0;
    } catch {
      return 0;
    }
  }

  private countRequest() {
    try {
      localStorage.setItem(
        USAGE_KEY,
        JSON.stringify({ day: this.today(), count: this.usedToday() + 1 }),
      );
    } catch {
      // Storage blocked: the in-memory throttle still applies.
    }
  }

  private readAnswer(key: string): ConciergeReply | null {
    try {
      const cache = JSON.parse(sessionStorage.getItem(ANSWER_CACHE_KEY) ?? '{}') as Record<
        string,
        ConciergeReply
      >;
      return cache[key] ?? null;
    } catch {
      return null;
    }
  }

  private writeAnswer(key: string, reply: ConciergeReply) {
    try {
      const cache = JSON.parse(sessionStorage.getItem(ANSWER_CACHE_KEY) ?? '{}') as Record<
        string,
        ConciergeReply
      >;
      cache[key] = reply;
      sessionStorage.setItem(ANSWER_CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Not cached; the next identical question just costs a request.
    }
  }
}
