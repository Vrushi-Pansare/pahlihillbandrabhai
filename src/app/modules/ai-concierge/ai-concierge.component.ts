import { Component, ElementRef, OnDestroy, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RESTAURANT_INFO } from '../../configs/restaurant-info';
import { MenuProduct } from '../menu-category/menu-listing.api';
import { ConciergeKnowledgeService } from './concierge-knowledge.service';
import { ChatTurn, ConciergeError, GeminiChatApi } from './gemini-chat.api';
import { VoiceError, VoiceInputService } from './voice-input.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  items?: MenuProduct[];
  // Local notices (throttling, errors) are shown but never sent back to the
  // model as history.
  notice?: boolean;
}

// Static, so opening the page costs no Gemini request.
const WELCOME =
  "I'm the Pahli Hill AI Concierge, your digital guide to the restaurant. Ask me about the menu, the world's first allergen menu, the world's first cinema menu, opening hours, private hires, or what's good tonight.";

const SUGGESTIONS = [
  "What's spicy?",
  'Vegetarian dishes?',
  "What's the chef's special?",
  'Is the meat Halal?',
  'Can I book a private party?',
];

const MAX_QUESTION_LENGTH = 400;

// Voice input: this long without a new word after speaking sends the question.
// Tapping the mic to stop instead keeps the text in the box unsent.
const VOICE_SILENCE_MS = 3000;

@Component({
  selector: 'app-ai-concierge',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './ai-concierge.component.html',
  styleUrl: './ai-concierge.component.scss',
})
export class AiConciergeComponent implements OnInit, OnDestroy {
  @ViewChild('thread') private thread?: ElementRef<HTMLElement>;

  private readonly knowledgeService = inject(ConciergeKnowledgeService);
  private readonly gemini = new GeminiChatApi();
  private readonly voice = inject(VoiceInputService);

  readonly info = RESTAURANT_INFO;
  readonly suggestions = SUGGESTIONS;
  readonly maxLength = MAX_QUESTION_LENGTH;
  readonly aiAvailable = this.gemini.available;

  messages = signal<ChatMessage[]>([{ role: 'assistant', text: WELCOME }]);
  draft = '';
  sending = signal(false);
  knowledgeReady = computed(() => this.knowledgeService.knowledge() !== null);
  knowledgeFailed = this.knowledgeService.failed;

  // Mic button: speech is written into the box; the guest still taps send.
  readonly voiceSupported = this.voice.supported;
  listening = signal(false);

  ngOnInit() {
    // Normally already loaded by AppComponent; this covers a failed first try.
    this.knowledgeService.preload().catch(() => undefined);
  }

  ngOnDestroy() {
    this.voice.stop();
  }

  toggleVoice() {
    if (this.listening()) {
      this.voice.stop();
      return;
    }
    this.listening.set(true);
    this.voice.start(this.draft, {
      lang: 'en-GB',
      silenceMs: VOICE_SILENCE_MS,
      onText: (text) => (this.draft = text.slice(0, MAX_QUESTION_LENGTH)),
      onEnd: (error, finishedBySilence) => {
        this.listening.set(false);
        if (error) {
          this.pushNotice(this.voiceErrorText(error));
        } else if (finishedBySilence) {
          // The guest spoke, then paused: treat the pause as "send".
          this.ask(this.draft);
        }
      },
    });
  }

  ask(question: string) {
    const text = question.trim().slice(0, MAX_QUESTION_LENGTH);
    if (!text || this.sending()) return;
    // Sending mid-sentence: stop the mic so late words don't refill the box.
    if (this.listening()) this.voice.stop();

    const knowledge = this.knowledgeService.knowledge();
    if (!knowledge) {
      this.pushNotice(
        this.knowledgeFailed()
          ? `I can't reach the menu right now. Please call us on ${this.info.phoneDisplay}.`
          : 'Still laying the table — the menu is loading, ask again in a moment.',
      );
      this.knowledgeService.preload().catch(() => undefined);
      return;
    }

    // History = real exchanges only, captured before this question is added.
    const history: ChatTurn[] = this.messages()
      .slice(1)
      .filter((m) => !m.notice)
      .map((m) => ({ role: m.role, text: m.text }));

    this.messages.update((list) => [...list, { role: 'user', text }]);
    this.draft = '';
    this.sending.set(true);
    this.scrollToEnd();

    this.gemini
      .ask(this.knowledgeService.buildContext(knowledge) + this.londonNow(), history, text)
      .then((reply) => {
        const items = reply.itemIds
          .map((id) => this.knowledgeService.productById(id))
          .filter((p): p is MenuProduct => !!p);
        this.messages.update((list) => [...list, { role: 'assistant', text: reply.reply, items }]);
      })
      .catch((error: unknown) => {
        // A throttled question was never answered, so put it back in the box.
        if (error instanceof ConciergeError && error.code === 'throttled') {
          this.messages.update((list) => list.slice(0, -1));
          this.draft = text;
        }
        this.pushNotice(this.errorText(error));
      })
      .finally(() => {
        this.sending.set(false);
        this.scrollToEnd();
      });
  }


  formatPrice(price: number | null): string {
    if (price == null) return '';
    return Number.isInteger(price) ? `£${price}` : `£${price.toFixed(2)}`;
  }

  // "DAIRY - GLUTEN - NUTS" -> ['DAIRY', 'GLUTEN', 'NUTS'], long words clipped
  // like the printed menu's chips ("MOLLUSCS" -> "MOLL.").
  allergenChips(item: MenuProduct): string[] {
    const label = item.allergen?.label;
    if (!label || /^(none|nil|n\/?a|-)$/i.test(label.trim())) return [];
    return label
      .split(/\s*[-,/&|+]\s*/)
      .map((part) => part.trim().toUpperCase())
      .filter(Boolean)
      .map((part) => (part.length > 7 ? `${part.slice(0, 4)}.` : part));
  }

  private voiceErrorText(error: NonNullable<VoiceError>): string {
    switch (error) {
      case 'blocked':
        return 'Microphone access is blocked. Allow it in your browser’s site settings to speak your question, or just type it.';
      case 'no-mic':
        return 'I couldn’t find a microphone. Please type your question instead.';
      default:
        return 'Voice input isn’t available right now. Please type your question instead.';
    }
  }

  private pushNotice(text: string) {
    this.messages.update((list) => [...list, { role: 'assistant', text, notice: true }]);
    this.scrollToEnd();
  }

  private errorText(error: unknown): string {
    const code = error instanceof ConciergeError ? error.code : 'failed';
    const seconds = error instanceof ConciergeError ? Math.ceil(error.retryInMs / 1000) : 0;
    switch (code) {
      case 'no-key':
        return `The concierge is off duty right now. Call us on ${this.info.phoneDisplay} and the team will help.`;
      case 'throttled':
        return `One moment — I'm still catching my breath. Ask again in ${seconds}s.`;
      case 'rate-limited':
        return `The house is very busy right now. Please try again in about ${Math.max(seconds, 1)}s, or call ${this.info.phoneDisplay}.`;
      case 'daily-limit':
        return `That's all the questions I can take today. For anything else, call ${this.info.phoneDisplay} or email ${this.info.email}.`;
      default:
        // Only reached when every Gemini attempt failed (network/server), never
        // for an off-topic or unknown question; the model answers those itself.
        return `Sorry, I lost my connection for a moment. Please ask again, or call ${this.info.phoneDisplay}.`;
    }
  }

  // Lets the model answer "are you open now?" against the listed hours.
  private londonNow(): string {
    const now = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
    return `\n\nCurrent time in London: ${now}.`;
  }

  private scrollToEnd() {
    setTimeout(() => {
      const el = this.thread?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
