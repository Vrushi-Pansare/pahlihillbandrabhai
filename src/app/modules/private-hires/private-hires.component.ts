import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { APP_CONFIG } from '../../configs/constants';
import {
  PrivateHireEnquiriesApi,
  type PrivateHireEnquiryPayload,
} from './private-hire-enquiries.api';

@Component({
  selector: 'app-private-hires',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './private-hires.component.html',
  styleUrl: './private-hires.component.scss',
})
export class PrivateHiresComponent implements AfterViewInit {
  private readonly enquiriesApi = new PrivateHireEnquiriesApi(
    APP_CONFIG.privateHireEnquiriesApiUrl,
  );

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  interiorLandscapeUrl = APP_CONFIG.interiorLandscapeUrl;
  privateHireVideoUrl = APP_CONFIG.privateHirePosterUrl;
  privateHireDesktopVideoUrl = APP_CONFIG.privateHireVideoUrl;
  semiPrivateHireImgUrl =
    'assets/Home/Transform_this_restaurant_interior_into_a_landscap-1779458775636.png';
  hireRestaurantVideoUrl =
    'assets/Home/Pahli Hill Bandra Bhai Private Hire Upto 60 Guests.mp4';
  hireBarVideoUrl = 'assets/bb-private-hire-bu569bel-vuceqfi6_9QMrqgoo.mp4';
  heroVideoUrl = 'assets/Home/Interior-Landscape (1).mp4';

  ngAfterViewInit() {
    if (this.heroVideo?.nativeElement) {
      this.heroVideo.nativeElement.muted = true;
      this.heroVideo.nativeElement.play().catch(() => {});
    }
  }

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  async submitEnquiry(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const optionalString = (key: string): string | undefined => {
      const value = String(formData.get(key) ?? '').trim();
      return value || undefined;
    };
    const partySize = optionalString('party_size');
    const payload: PrivateHireEnquiryPayload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: optionalString('phone'),
      eventDate: optionalString('event_date'),
      partySize: partySize ? Number(partySize) : undefined,
      space: optionalString('space') as PrivateHireEnquiryPayload['space'],
      message: optionalString('message'),
    };

    try {
      await this.enquiriesApi.submit(payload);
      this.submitSuccess = true;
      form.reset();
    } catch {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
