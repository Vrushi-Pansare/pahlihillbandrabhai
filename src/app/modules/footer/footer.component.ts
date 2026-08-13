import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  logoUrl = APP_CONFIG.logoUrl;
  currentYear = new Date().getFullYear();
}
