import { Component } from '@angular/core';
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
export class PrivateHiresComponent {
  interiorLandscapeUrl = APP_CONFIG.interiorLandscapeUrl;
  privateHireVideoUrl = APP_CONFIG.privateHirePosterUrl;
  privateHireDesktopVideoUrl = APP_CONFIG.privateHireVideoUrl;
  semiPrivateHireImgUrl =
    'assets/Home/Transform_this_restaurant_interior_into_a_landscap-1779458775636.png';
  hireRestaurantVideoUrl =
    'assets/Home/Pahli Hill Bandra Bhai Private Hire Upto 60 Guests.mp4';
  hireBarVideoUrl = 'assets/Home/BB Private Hire.mp4';
  heroVideoUrl = 'assets/Home/Interior-Landscape (1).mp4';
  // Event enquiry recipient email (Currently set to vrushalicshare@gmail.com; switch to reservations@pahlihillbandrabhai.com for production)
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
            _subject: 'New Private Hire Enquiry — Pahli Hill Bandra Bhai',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            event_date: formData.get('event_date'),
            party_size: formData.get('party_size'),
            space: formData.get('space'),
            message: formData.get('message'),
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
