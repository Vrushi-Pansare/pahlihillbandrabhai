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
      image: 'assets/team/shourrya.jpg',
      description:
        '"The Guest gets what the guest wants" - Entrepreneurial general manager blending strategy, operations, leadership and guest-focused and employee morale hospitality. "JACK OF ALL TRADES MASTER OF MANY"',
    },
    {
      name: 'Mahesh',
      role: 'Head Chef',
      image: 'assets/team/mahesh.jpg',
      description:
        'A deeply experienced head chef known for warmth, craft and quiet excellence.',
    },
    {
      name: 'Nikhil',
      role: 'Restaurant Manager',
      image: 'assets/team/nikhil.jpg',
      description:
        'Energetic restaurant manager driven by resilience, momentum, people, and solutions.',
    },
    {
      name: 'Rose',
      role: 'Reservations Manager',
      image: 'assets/team/rose.jpg',
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
      image: 'assets/team/yash.jpg',
      description:
        'Warm, grounded hospitality manager shaped by family, service, and ambition.',
    },
    {
      name: 'Dipak',
      role: 'Sous Chef',
      image: 'assets/team/dipak.jpg',
      description:
        'Skilled tandoori chef combining authenticity, creativity, discipline and business insight.',
    },
    {
      name: 'Sanam',
      role: 'Chef de Partie',
      image: 'assets/team/sanam.jpg',
      description:
        'A skilled chef known for consistency, focus and calm under pressure.',
    },
    {
      name: 'Baptista Barreto',
      role: 'Chef de Partie',
      image: 'assets/team/Baptista Barreto.png',
      description: '',
    },
    {
      name: 'Anitha Roadrigas',
      role: 'Commi',
      image: 'assets/team/Anitha Roadrigas.png',
      description: '',
    },
    {
      name: 'Will',
      role: 'Porter',
      image: 'assets/team/Will Porter.png',
      description:
        'I am Wil, I come from Ivory Coast. I work with the agency 7 to 7. Indeed, thanks to the flexibility of agency work, I was able to discover several restaurants, several working methods and hold several positions...',
    },
    {
      name: 'Vamos',
      role: 'Porter',
      image: 'assets/team/Vamos Porter.png',
      description:
        "Hello, I am Vamos, a kitchen porter recognized for my good humor and positive attitude. I was born in Côte d'Ivoire, more precisely in Abidjan.",
    },
    {
      name: 'Sameer',
      role: 'Director',
      image: 'assets/team/sameer.jpg',
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
