import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-speakeasy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './speakeasy.component.html',
  styleUrl: './speakeasy.component.scss'
})
export class SpeakeasyComponent implements AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  config = APP_CONFIG;
  posterUrl = APP_CONFIG.speakeasyPosterUrl;
  mobileVideoUrl =
    APP_CONFIG.speakeasyMobileVideoUrl ||
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-09-03T10:21:04.112Z/Drinks-Final(1).mp4';
  desktopVideoUrl =
    APP_CONFIG.speakeasyDesktopVideoUrl ||
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-09-03T10:19:47.595Z/Drinks-Landscape(1).mp4';

  ngAfterViewInit() {
    if (this.heroVideo?.nativeElement) {
      const video = this.heroVideo.nativeElement;
      video.muted = true;

      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
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
        observer.observe(video);
      } else {
        video.play().catch(() => {});
      }
    }
  }
}
