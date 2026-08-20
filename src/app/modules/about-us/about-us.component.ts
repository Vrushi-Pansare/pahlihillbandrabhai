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
      image: 'https://pahlihillbandrabhai.com/assets/shourrya-DVfkFvrx.jpg',
      description:
        'Resilient and detail-oriented manager crafting stellar guest journeys.',
    },
    {
      name: 'Mahesh',
      role: 'Head Chef',
      image: 'https://pahlihillbandrabhai.com/assets/mahesh-Dpuq5aKK.jpg',
      description:
        'Master of regional flavors blending traditional recipes with modern zest.',
    },
    {
      name: 'Nikhil',
      role: 'Restaurant Manager',
      image: 'https://pahlihillbandrabhai.com/assets/nikhil-D2vEi3Wh.jpg',
      description:
        'Energetic restaurant manager driven by resilience, momentum, people and solutions.',
    },
    {
      name: 'Rose',
      role: 'Reservations Manager',
      image: 'https://pahlihillbandrabhai.com/assets/rose-CGIncH2d.jpg',
      description:
        'Welcoming voice structuring flawless reservation schedules.',
    },
    {
      name: 'Guru',
      role: 'Bar Manager',
      image: 'https://pahlihillbandrabhai.com/assets/guru-BtVH_c--.jpg',
      description:
        'Craft mixologist designing unique infusions and heritage cocktails.',
    },
    {
      name: 'Yash',
      role: 'Bandra Bhai Manager',
      image: 'https://pahlihillbandrabhai.com/assets/yash--wsPzzRP.jpg',
      description:
        'Keeper of speakeasy vibes and late-night underground energy.',
    },
    {
      name: 'Dipak',
      role: 'Sous Chef',
      image: 'https://pahlihillbandrabhai.com/assets/dipak-BHAn9kL5.jpg',
      description:
        'Precision specialist overseeing culinary excellence on the line.',
    },
    {
      name: 'Sanam',
      role: 'Chef de Partie',
      image: 'https://pahlihillbandrabhai.com/assets/sanam-DyhpJ3AR.jpg',
      description:
        'Creative culinary artist focused on authentic spice blending.',
    },
    {
      name: 'Baptista Barreto',
      role: 'Chef de Partie',
      image: 'https://pahlihillbandrabhai.com/assets/baptista-C_qt7Uu7.jpg',
      description:
        'Dedicated chef crafting outstanding textures and delicate regional bites.',
    },
    {
      name: 'Anitha Roadrigas',
      role: 'Commi',
      image: 'https://pahlihillbandrabhai.com/assets/anitha-DKqAyA4x.jpg',
      description:
        'Passionate helper learning the secrets of traditional kitchen craft.',
    },
    {
      name: 'Sameer',
      role: 'Director',
      image: 'https://pahlihillbandrabhai.com/assets/sameer-CKO4-XqD.jpg',
      description:
        'Visionary strategist driving the spirit of hospitality and character.',
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
