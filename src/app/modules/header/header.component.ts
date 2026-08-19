import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoUrl = APP_CONFIG.logoUrl;
  isMobileMenuOpen = false;
  isAboutSubOpen = false;
  isMenuSubOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleAboutSub() {
    this.isAboutSubOpen = !this.isAboutSubOpen;
  }

  toggleMenuSub() {
    this.isMenuSubOpen = !this.isMenuSubOpen;
  }
}
