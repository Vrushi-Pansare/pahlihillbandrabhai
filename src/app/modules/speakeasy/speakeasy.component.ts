import { Component } from '@angular/core';
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
export class SpeakeasyComponent {
  config = APP_CONFIG;
  posterUrl = APP_CONFIG.speakeasyPosterUrl;
  mobileVideoUrl = 'assets/Home/Drinks - Final (1).mp4';
  desktopVideoUrl = 'assets/Home/Drinks-Landscape (1).mp4';
}
