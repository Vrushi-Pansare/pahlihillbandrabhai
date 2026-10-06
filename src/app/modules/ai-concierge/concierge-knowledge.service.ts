import { Injectable, signal } from '@angular/core';
import { APP_CONFIG } from '../../configs/constants';
import { RESTAURANT_INFO } from '../../configs/restaurant-info';
import { FAQS } from '../faq/faq.data';
import { MenuListingApi, MenuProduct } from '../menu-category/menu-listing.api';

// Listing modules the concierge also reads when the API publishes them. Today
// only `product` is public; these return MODULE_NOT_FOUND and are skipped, so
// once they go live the concierge picks them up with no code change.
const EXTRA_MODULES = ['location-data', 'store-location', 'faq'];

// One load per browser tab session: every page view after the first reuses
// it, so opening the concierge never waits on the API.
const CACHE_KEY = 'phbb_concierge_knowledge_v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

// Fields that only matter to the back office; dropping them keeps the prompt
// (and so every Gemini request) small.
const PROMPT_SKIP_FIELDS = new Set([
  'id', 'companyId', 'status', 'createdAt', 'updatedAt', 'version', 'productImages',
  'platingImage', 'hsnCode', 'gst', 'vat',
]);

export interface ExtraModule {
  moduleCode: string;
  records: Record<string, unknown>[];
}

export interface ConciergeKnowledge {
  products: MenuProduct[];
  extras: ExtraModule[];
  loadedAt: number;
}

@Injectable({ providedIn: 'root' })
export class ConciergeKnowledgeService {
  private readonly listingApi = new MenuListingApi(APP_CONFIG.listingApiUrl);
  private pending: Promise<ConciergeKnowledge> | null = null;

  readonly knowledge = signal<ConciergeKnowledge | null>(null);
  readonly failed = signal(false);

  // Called from AppComponent on first load so the data is ready by the time a
  // guest opens the concierge. Safe to call repeatedly.
  preload(): Promise<ConciergeKnowledge> {
    if (this.pending) return this.pending;

    const cached = this.readCache();
    if (cached) {
      this.knowledge.set(cached);
      this.pending = Promise.resolve(cached);
      return this.pending;
    }

    this.pending = Promise.all([
      this.listingApi.loadAll(),
      Promise.all(EXTRA_MODULES.map((code) => this.loadExtra(code))),
    ])
      .then(([products, extras]) => {
        const knowledge: ConciergeKnowledge = {
          products,
          extras: extras.filter((e): e is ExtraModule => !!e && e.records.length > 0),
          loadedAt: Date.now(),
        };
        this.knowledge.set(knowledge);
        this.failed.set(false);
        this.writeCache(knowledge);
        return knowledge;
      })
      .catch((error) => {
        // Let the next call retry instead of caching the failure.
        this.pending = null;
        this.failed.set(true);
        throw error;
      });

    return this.pending;
  }

  productById(id: string): MenuProduct | undefined {
    return this.knowledge()?.products.find((p) => p.id === id);
  }

  // Everything the model is allowed to know, as compact plain text. The
  // system prompt tells it to answer from this and nothing else.
  buildContext(knowledge: ConciergeKnowledge): string {
    const info = RESTAURANT_INFO;
    const sections = [
      '## Restaurant',
      `${info.name}. ${info.about}`,
      info.floors,
      `Address: ${info.addressLines.join(', ')}. Phone: ${info.phoneDisplay}. Email: ${info.email}.`,
      `Book a table: ${info.bookingUrl}. Gift cards: ${info.giftCardsUrl}.`,
      `Opening hours: ${info.hours.map((h) => `${h.days} ${h.opens}–${h.closes}`).join('; ')}. Last orders usually 15 minutes before closing.`,
      '',
      '## Menu items (id | name | price | category | group | allergens | tags | other details)',
      ...knowledge.products.map((p) => this.productLine(p)),
      '',
      '## FAQ',
      ...FAQS.map((f) => `Q: ${f.question}\nA: ${f.answer.join(' ')}`),
    ];

    for (const extra of knowledge.extras) {
      sections.push('', `## ${extra.moduleCode}`);
      sections.push(...extra.records.map((r) => this.compactRecord(r)));
    }

    return sections.join('\n');
  }

  private productLine(p: MenuProduct): string {
    const price = p.unitPrice == null ? '' : `£${p.unitPrice}`;
    const shown = new Set([
      'name', 'unitPrice', 'description', 'category', 'group', 'allergen', 'tags', 'brand',
    ]);
    const details = this.compactRecord(p as unknown as Record<string, unknown>, shown);
    return [
      p.id,
      p.name,
      price,
      p.category?.label ?? '',
      p.group?.label ?? p.brand?.label ?? '',
      p.allergen?.label ?? 'none declared',
      p.tags?.label ?? '',
      [p.description, details].filter(Boolean).join(' '),
    ].join(' | ');
  }

  // key=value pairs for every filled-in field, with lookup objects reduced to
  // their label and *Id foreign keys dropped.
  private compactRecord(record: Record<string, unknown>, skip = new Set<string>()): string {
    const parts: string[] = [];
    for (const [key, value] of Object.entries(record)) {
      if (skip.has(key) || PROMPT_SKIP_FIELDS.has(key) || /Id$/.test(key)) continue;
      if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) continue;
      const text =
        typeof value === 'object' && value && 'label' in value
          ? String((value as { label: unknown }).label)
          : typeof value === 'object'
            ? JSON.stringify(value)
            : String(value);
      parts.push(`${key}=${text}`);
    }
    return parts.join('; ');
  }

  private async loadExtra(moduleCode: string): Promise<ExtraModule | null> {
    try {
      const response = await window.fetch(APP_CONFIG.listingApiUrl, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleCode }),
      });
      if (!response.ok) return null;
      const body = (await response.json()) as { success: boolean; data: unknown };
      if (!body.success || !Array.isArray(body.data)) return null;
      return { moduleCode, records: body.data as Record<string, unknown>[] };
    } catch {
      return null;
    }
  }

  private readCache(): ConciergeKnowledge | null {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as ConciergeKnowledge;
      if (Date.now() - parsed.loadedAt > CACHE_TTL_MS) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  private writeCache(knowledge: ConciergeKnowledge) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(knowledge));
    } catch {
      // Private mode or full storage: the in-memory copy still works.
    }
  }
}
