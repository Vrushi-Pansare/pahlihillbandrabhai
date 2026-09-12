import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

const SESSION_KEY = 'phbb-promo-dialog-dismissed';
const SLIDE_DURATION_MS = 3200;
const BOOKING_URL =
  'https://www.sevenrooms.com/explore/pahlihill/reservations/create/details/?details_id=ahNzfnNldmVucm9vbXMtc2VjdXJlcjALEg9uaWdodGxvb3BfVmVudWUYgID45MSUiAkMCxIKRXhwZXJpZW5jZRi3-onaJww&details_type=EXPERIENCE&searchTab=experiences';

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

  images = [
    'assets/Home/promo/promo-1.png',
    'assets/Home/promo/promo-2.png',
    'assets/Home/promo/promo-3.png',
  ];

  private slideInterval: any;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const alreadyDismissed = window.sessionStorage.getItem(SESSION_KEY);
    if (!alreadyDismissed) {
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
    if (typeof window !== 'undefined') {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
    this.close();
  }

  close(): void {
    this.closing = true;
    this.stopSlider();
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    }
    setTimeout(() => (this.visible = false), 220);
  }

  private startSlider(): void {
    this.slideInterval = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, this.slideDurationMs);
  }

  private restartSlider(): void {
    this.stopSlider();
    this.startSlider();
  }

  private stopSlider(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}
