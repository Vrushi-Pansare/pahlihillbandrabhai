import { Component, OnInit } from '@angular/core';

declare let gtag: Function;
declare let fbq: Function;

// Keep in sync with the consent bootstrap script in index.html, which reads
// this key before gtag/fbq send their first hit.
const STORAGE_KEY = 'phbb_cookie_consent';

type ConsentChoice = 'granted' | 'denied';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit {
  visible = false;
  closing = false;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.visible = !this.readChoice();
  }

  accept(): void {
    this.save('granted');
  }

  reject(): void {
    this.save('denied');
  }

  private save(choice: ConsentChoice): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, at: new Date().toISOString() })
      );
    } catch {
      // Storage blocked (private mode etc.) — the choice still applies to this visit.
    }
    this.applyToTrackers(choice);

    this.closing = true;
    setTimeout(() => (this.visible = false), 220);
  }

  private applyToTrackers(choice: ConsentChoice): void {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: choice,
        ad_user_data: choice,
        ad_personalization: choice,
        analytics_storage: choice,
      });
    }
    if (typeof fbq === 'function') {
      fbq('consent', choice === 'granted' ? 'grant' : 'revoke');
      // The initial PageView was held back while consent was pending.
      if (choice === 'granted') fbq('track', 'PageView');
    }
  }

  private readChoice(): ConsentChoice | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw).choice as ConsentChoice) : null;
    } catch {
      return null;
    }
  }
}
