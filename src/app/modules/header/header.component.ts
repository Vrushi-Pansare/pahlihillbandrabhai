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
  activeClickedUrl = '';

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleAboutSub() {
    this.isAboutSubOpen = !this.isAboutSubOpen;
  }

  toggleMenuSub() {
    this.isMenuSubOpen = !this.isMenuSubOpen;
  }

  setActiveLink(id: string) {
    this.activeClickedUrl = id;
  }

  closeMobileMenuDeferred(id?: string) {
    if (id) {
      this.activeClickedUrl = id;
    }
    setTimeout(() => {
      this.isMobileMenuOpen = false;
    }, 400);
  }
}
