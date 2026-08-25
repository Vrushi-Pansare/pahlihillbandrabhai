import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-private-hires',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './private-hires.component.html',
  styleUrl: './private-hires.component.scss',
})
export class PrivateHiresComponent implements AfterViewInit {
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

  // Event enquiry recipient email (Currently set to reservations@pahlihillbandrabhai.com; switch to reservations@pahlihillbandrabhai.com for production)
  enquiryEmail = 'reservations@pahlihillbandrabhai.com';

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

    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const eventDate = formData.get('event_date') || '';
    const partySize = formData.get('party_size') || '';
    const space = formData.get('space') || '';
    const message = formData.get('message') || '';

    const fullEnquiryDetails = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Event Date: ${eventDate}
Party Size: ${partySize}
Space: ${space}
Message: ${message}
    `.trim();

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${this.enquiryEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Private hire enquiry — ${name} (${eventDate})`,
            _captcha: 'false',
            _template: 'box',
            _autoresponse:
              'Thank you for reaching out to Pahli Hill Bandra Bhai! We have received your private hire enquiry and our team will get back to you shortly.',
            'Private Hire Enquiry Details': fullEnquiryDetails,
          }),
        },
      );

      if (response.ok) {
        this.submitSuccess = true;
        form.reset();
      } else {
        this.submitError = true;
      }
    } catch (err) {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
