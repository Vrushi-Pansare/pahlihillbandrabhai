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
  @ViewChild('hireRestaurantVideo') hireRestaurantVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('hireBarVideo') hireBarVideo!: ElementRef<HTMLVideoElement>;

  interiorLandscapeUrl = APP_CONFIG.interiorLandscapeUrl;
  speakeasyPosterUrl = APP_CONFIG.speakeasyPosterUrl;
  privateHireVideoUrl = APP_CONFIG.privateHirePosterUrl;
  privateHireDesktopVideoUrl = APP_CONFIG.privateHireVideoUrl;
  semiPrivateHireImgUrl =
    'assets/Home/Transform_this_restaurant_interior_into_a_landscap-1779458775636.png';
  hireRestaurantVideoUrl =
    APP_CONFIG.hireRestaurantVideoUrl ||
    'assets/private-hires/hire-restaurant.mp4';
  hireBarVideoUrl =
    APP_CONFIG.bbPrivateHireVideoUrl || 'assets/private-hires/hire-bar.mp4';
  heroVideoUrl =
    APP_CONFIG.privateHireVideoUrl || 'assets/private-hires/hero-desktop.mp4';

  ngAfterViewInit() {
    const videos = [
      this.heroVideo?.nativeElement,
      this.hireRestaurantVideo?.nativeElement,
      this.hireBarVideo?.nativeElement,
    ].filter((v): v is HTMLVideoElement => Boolean(v));

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.muted = true;
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 }
      );

      videos.forEach((video) => {
        video.muted = true;
        observer.observe(video);
      });
    } else {
      videos.forEach((video) => {
        video.muted = true;
        video.play().catch(() => {});
      });
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
