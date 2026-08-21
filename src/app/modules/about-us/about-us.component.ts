import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit, OnDestroy {
  teamPhotoUrl = APP_CONFIG.teamPhotoUrl;
  bananaLeafUrl = APP_CONFIG.bananaLeafUrl;
  factAwardLogoUrl = APP_CONFIG.factAwardLogoUrl;

  teamMembers = [
    {
      name: 'Shourrya',
      role: 'General Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:30:34.016Z/Shourrya.jpg',
      description:
        '"The Guest gets what the guest wants" - Entrepreneurial general manager blending strategy, operations, leadership and guest-focused and employee morale hospitality. "JACK OF ALL TRADES MASTER OF MANY"',
    },
    {
      name: 'Mahesh',
      role: 'Head Chef',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:23:52.215Z/Mahesh.jpg',
      description:
        'A deeply experienced head chef known for warmth, craft and quiet excellence.',
    },
    {
      name: 'Nikhil',
      role: 'Restaurant Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:40:46.651Z/Nikhil.jpg',
      description:
        'Energetic restaurant manager driven by resilience, momentum, people, and solutions.',
    },
    {
      name: 'Rose',
      role: 'Reservations Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:39:45.456Z/Rose.jpg',
      description:
        'Ambitious FOH professional with warmth, drive, leadership, poise and acumen.',
    },
    {
      name: 'Guru',
      role: 'Bar Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:38:42.826Z/Guru.jpg',
      description:
        'Engineering graduate turned bar manager, blending technical thinking with hospitality.',
    },
    {
      name: 'Yash',
      role: 'Bandra Bhai Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:37:23.670Z/Yash.jpg',
      description:
        'Warm, grounded hospitality manager shaped by family, service, and ambition.',
    },
    {
      name: 'Dipak',
      role: 'Sous Chef',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:35:55.281Z/Dipak.jpg',
      description:
        'Skilled tandoori chef combining authenticity, creativity, discipline and business insight.',
    },
    {
      name: 'Sanam',
      role: 'Chef de Partie',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:26:53.828Z/Sanam.jpg',
      description:
        'A skilled chef known for consistency, focus and calm under pressure.',
    },
    {
      name: 'Baptista Barreto',
      role: 'Chef de Partie',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:34:17.089Z/BaptistaBarreto.jpg',
      description: '',
    },
    {
      name: 'Anitha Roadrigas',
      role: 'Commi',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:36.573Z/AnithaRoadrigas.jpg',
      description: '',
    },
    {
      name: 'Will',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:01.862Z/WillPorter.jpg',
      description:
        'I am Wil, I come from Ivory Coast. I work with the agency 7 to 7. Indeed, thanks to the flexibility of agency work, I was able to discover several restaurants, several working methods and hold several positions...',
    },
    {
      name: 'Vamos',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:31:27.589Z/VamosPorter.jpg',
      description:
        'Hello, I am Vamos, a kitchen porter recognized for my good humor and positive attitude. I was born in Côte d\'Ivoire, more precisely in Abidjan.',
    },
    {
      name: 'Sameer',
      role: 'Director',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T11:52:51.525Z/Sameer.jpg',
      description: '',
    },
  ];

  activeMemberIndex = 0;
  slideIntervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.slideIntervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.slideIntervalId) {
      clearInterval(this.slideIntervalId);
    }
  }

  selectMember(index: number) {
    this.activeMemberIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide() {
    this.activeMemberIndex =
      (this.activeMemberIndex + 1) % this.teamMembers.length;
  }
}
