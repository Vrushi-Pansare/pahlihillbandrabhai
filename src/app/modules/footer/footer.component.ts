import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  logoUrl = APP_CONFIG.logoUrl;
  bananaLeafUrl = APP_CONFIG.bananaLeafUrl;
  restaurantSketchUrl = APP_CONFIG.restaurantSketchUrl;
  currentYear = new Date().getFullYear();

  /**
   * Check if restaurant is currently OPEN based on London (UK) time
   * Mon - Sat: 12:00 - 22:00
   * Sun: 12:00 - 17:00
   */
  get isOpen(): boolean {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    });

    const parts = formatter.formatToParts(now);
    let weekday = '';
    let hours = 0;
    let minutes = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekday = part.value;
      if (part.type === 'hour') hours = parseInt(part.value, 10);
      if (part.type === 'minute') minutes = parseInt(part.value, 10);
    }

    const currentDecimalTime = hours + minutes / 60;

    if (weekday === 'Sun') {
      // Sunday: 12:00 to 17:00
      return currentDecimalTime >= 12 && currentDecimalTime < 17;
    } else {
      // Monday to Saturday: 12:00 to 22:00
      return currentDecimalTime >= 12 && currentDecimalTime < 22;
    }
  }
}
