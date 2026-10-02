import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '../../configs/constants';

export interface HeaderMenuItem {
  code: string;
  label: string;
  // In-site page for this entry; items without one are not wired up yet.
  route?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoUrl = APP_CONFIG.logoUrl;
  menuItems: HeaderMenuItem[] = [
    { code: 'full-menu', label: 'Full Menu', route: '/full-menu' },
    { code: 'allergen-menu', label: 'Allergen Menu', route: '/allergen-menu' },
    { code: 'order-delivery', label: 'Order Delivery' },
  ];
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
