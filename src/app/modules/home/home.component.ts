import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('foodVideo') foodVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('speakeasyVideo') speakeasyVideo!: ElementRef<HTMLVideoElement>;
  @ViewChildren('carouselVideo') carouselVideos!: QueryList<ElementRef<HTMLVideoElement>>;
  mobileVideoUrl =
    APP_CONFIG.homeMobileVideoUrl || 'assets/Home/hero-mix-mobile.mp4';
  desktopVideoUrl =
    APP_CONFIG.homeDesktopVideoUrl || 'assets/Home/hero-mix-desktop.mp4';
  foodMobileVideoUrl =
    APP_CONFIG.foodMobileVideoUrl || 'assets/Home/food-mobile.mp4';
  foodDesktopVideoUrl =
    APP_CONFIG.foodDesktopVideoUrl || 'assets/Home/food-desktop.mp4';
  // Carousel data
  activeSlide = 0;
  slides = [
    {
      name: 'Sweet Potato Chaat',
      img: 'assets/Home/sweet-potato-chaat.jpg',
      video:
        'https://pahlihillbandrabhai.com/__l5e/assets-v1/a05a2844-62dc-4020-9fb5-783e931ea0c8/chicory-chaat.mp4',
    },
    {
      name: 'Chilli Cheese Dosa',
      img: 'assets/Home/chilli-cheese-dosa.jpg',
      video:
        'https://pahlihillbandrabhai.com/__l5e/assets-v1/06fad0b4-cdea-4191-b07a-27a714532c0a/chilli-cheese-dosa.mp4',
    },
    {
      name: 'Lamb Kothu Roti',
      img: 'assets/Home/lamb-kothu-roti.jpg',
      video:
        'https://pahlihillbandrabhai.com/__l5e/assets-v1/4cb3b530-eb52-4754-abda-d8dfeea0668e/lamb-kothu-roti.mp4',
    },
    // {
    //   name: 'Rabdi Tres Leches',
    //   img: 'https://pahlihillbandrabhai.com/assets/rabdi-tres-leches-C4y--0-_.jpg',
    //   video:
    //     'https://pahlihillbandrabhai.com/__l5e/assets-v1/e0c19eb9-dc0d-4faf-b397-eaffd2b3b5fb/rabdi-tres-leches.mp4',
    // },
    // {
    //   name: 'Beetroot Seekh Kakori',
    //   img: 'https://pahlihillbandrabhai.com/__l5e/assets-v1/ae03ab70-abfc-466e-b68e-4ce9d4ad79d1/beetroot-seekh.png',
    //   video:
    //     'https://pahlihillbandrabhai.com/__l5e/assets-v1/7a38b1be-bd63-4656-8c2e-20865d482192/beetroot-kakori-seekh.mp4',
    // },
    // {
    //   name: 'Pahli Hill Coastal Harvest Salad',
    //   img: 'https://pahlihillbandrabhai.com/__l5e/assets-v1/9f344979-d9d5-41ec-bcff-9ae3cc21a377/coastal-harvest-broccoli-v2-pad.png',
    //   video:
    //     'https://pahlihillbandrabhai.com/__l5e/assets-v1/76056090-8595-42db-92f7-452350bd2914/coastal-harvest-broccoli.mp4',
    // },
  ];
  private carouselInterval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngAfterViewInit() {
    const videos = [
      this.heroVideo?.nativeElement,
      this.foodVideo?.nativeElement,
      this.speakeasyVideo?.nativeElement,
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
        { threshold: 0.15 }
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

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    setTimeout(() => this.updateCarouselPlayback(), 100);

    this.carouselInterval = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
      this.updateCarouselPlayback();
    }, 4000);
  }

  updateCarouselPlayback() {
    if (!this.carouselVideos) return;
    const vids = this.carouselVideos.toArray();
    vids.forEach((vidRef, index) => {
      const video = vidRef.nativeElement;
      if (index === this.activeSlide) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}
