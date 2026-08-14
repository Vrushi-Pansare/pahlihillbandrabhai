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
  styleUrl: './private-hires.component.scss'
})
export class PrivateHiresComponent {
  interiorLandscapeUrl = APP_CONFIG.interiorLandscapeUrl;
  privateHireVideoUrl = APP_CONFIG.privateHirePosterUrl;
  privateHireDesktopVideoUrl = APP_CONFIG.privateHireVideoUrl;
}
