import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

const SLIDE_DURATION_MS = 3200;
const LONG_PRESS_MS = 3000;
const BOOKING_URL =
  'https://www.sevenrooms.com/explore/pahlihill/reservations/create/details/?details_id=ahNzfnNldmVucm9vbXMtc2VjdXJlcjALEg9uaWdodGxvb3BfVmVudWUYgID45MSUiAkMCxIKRXhwZXJpZW5jZRi3-onaJww&details_type=EXPERIENCE&searchTab=experiences';

// Module-scoped (not sessionStorage): resets on a real page load/refresh,
// but survives SPA navigation away from and back to the home page.
let hasShownPromoDialog = false;

@Component({
  selector: 'app-promo-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-dialog.component.html',
  styleUrl: './promo-dialog.component.scss',
})
export class PromoDialogComponent implements OnInit, OnDestroy {
  visible = false;
  closing = false;
  activeIndex = 0;
  slideDurationMs = SLIDE_DURATION_MS;
  paused = false;

  images = [
    'assets/Home/promo/promo-1.png',
    'assets/Home/promo/promo-2.png',
    'assets/Home/promo/promo-3.png',
  ];

  private slideTimeout: any;
  private remainingMs = SLIDE_DURATION_MS;
  private slideStartedAt = 0;
  private holdStartedAt = 0;
  private wasLongPress = false;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    if (!hasShownPromoDialog) {
      hasShownPromoDialog = true;
      this.visible = true;
      this.startSlider();
    }
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  goTo(index: number): void {
    if (index === this.activeIndex) return;
    this.activeIndex = index;
    this.restartSlider();
  }

  openBooking(): void {
    if (this.wasLongPress) {
      this.wasLongPress = false;
      return;
    }
    if (typeof window !== 'undefined') {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
    this.close();
  }

  onHoldStart(): void {
    if (this.paused) return;
    this.holdStartedAt = Date.now();
    if (this.slideTimeout) {
      this.remainingMs -= Date.now() - this.slideStartedAt;
      clearTimeout(this.slideTimeout);
      this.slideTimeout = null;
    }
    this.paused = true;
  }

  onHoldEnd(): void {
    if (!this.paused) return;
    this.paused = false;
    this.wasLongPress = Date.now() - this.holdStartedAt >= LONG_PRESS_MS;
    this.runSlider(Math.max(this.remainingMs, 0));
  }

  close(): void {
    this.closing = true;
    this.stopSlider();
    setTimeout(() => (this.visible = false), 220);
  }

  private startSlider(): void {
    this.remainingMs = this.slideDurationMs;
    this.runSlider(this.remainingMs);
  }

  private runSlider(delay: number): void {
    this.slideStartedAt = Date.now();
    this.slideTimeout = setTimeout(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.remainingMs = this.slideDurationMs;
      this.runSlider(this.remainingMs);
    }, delay);
  }

  private restartSlider(): void {
    this.stopSlider();
    this.paused = false;
    this.startSlider();
  }

  private stopSlider(): void {
    if (this.slideTimeout) {
      clearTimeout(this.slideTimeout);
      this.slideTimeout = null;
    }
  }
}
