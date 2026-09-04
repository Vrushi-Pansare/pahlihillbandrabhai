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
    APP_CONFIG.speakeasyMobileVideoUrl || 'assets/speakeasy/speakeasy-mobile.mp4';
  desktopVideoUrl =
    APP_CONFIG.speakeasyDesktopVideoUrl ||
    'assets/speakeasy/speakeasy-desktop.mp4';

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
