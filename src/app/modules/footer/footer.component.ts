import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  logoUrl = APP_CONFIG.logoUrl;
  bananaLeafUrl = APP_CONFIG.bananaLeafUrl;
  restaurantSketchUrl = APP_CONFIG.restaurantSketchUrl;
  currentYear = new Date().getFullYear();

  /**
   * Check if restaurant is currently OPEN based on UK time
   * Mon - Sat: 12:00 - 22:00
   * Sun: 12:00 - 17:00
   */
  get isOpen(): boolean {
    const now = new Date();
    // Convert to London time
    const londonTimeStr = now.toLocaleString('en-US', { timeZone: 'Europe/London' });
    const londonDate = new Date(londonTimeStr);

    const day = londonDate.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    const hours = londonDate.getHours();
    const minutes = londonDate.getMinutes();
    const currentDecimalTime = hours + minutes / 60;

    if (day === 0) {
      // Sunday: 12:00 to 17:00
      return currentDecimalTime >= 12 && currentDecimalTime < 17;
    } else {
      // Monday to Saturday: 12:00 to 22:00
      return currentDecimalTime >= 12 && currentDecimalTime < 22;
    }
  }
}
