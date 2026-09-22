import { Component, OnInit, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { APP_CONFIG } from '../../configs/constants';
import { MenuListingApi, MenuProduct } from '../menu-category/menu-listing.api';

@Component({
  selector: 'app-full-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './full-menu.component.html',
  styleUrl: './full-menu.component.scss',
})
export class FullMenuComponent implements OnInit {
  private readonly listingApi = new MenuListingApi(APP_CONFIG.listingApiUrl);

  items = signal<MenuProduct[]>([]);
  selectedBrand = signal<string | null>(null);

  brands = computed(() => {
    const seen = new Map<string, string>();
    for (const item of this.items()) {
      if (item.brand && !seen.has(item.brand.code)) {
        seen.set(item.brand.code, item.brand.label);
      }
    }
    return [...seen.values()];
  });

  selectedCategory = signal<string | null>(null);

  categories = computed(() => {
    const seen = new Map<string, string>();
    for (const item of this.items()) {
      if (item.category && !seen.has(item.category.code)) {
        seen.set(item.category.code, item.category.label);
      }
    }
    return [...seen.values()];
  });

  searchQuery = signal('');

  selectedTags = signal<ReadonlySet<string>>(new Set());

  tags = computed(() => {
    const seen = new Map<string, string>();
    for (const item of this.items()) {
      if (item.tags && !seen.has(item.tags.code)) {
        seen.set(item.tags.code, item.tags.label);
      }
    }
    return [...seen.entries()].map(([code, label]) => ({ code, label }));
  });

  // The category pill row defaults its first entry to active before the
  // user picks one, so the panel below needs the same fallback.
  activeCategory = computed(
    () => this.selectedCategory() ?? this.categories()[0] ?? '',
  );

  categoryItems = computed(() =>
    this.items().filter((item) => item.category?.label === this.activeCategory()),
  );

  selectedGroups = signal<ReadonlySet<string>>(new Set());

  groups = computed(() => {
    const seen = new Map<string, string>();
    for (const item of this.categoryItems()) {
      if (item.group && !seen.has(item.group.code)) {
        seen.set(item.group.code, item.group.label);
      }
    }
    return [...seen.entries()].map(([code, label]) => ({ code, label }));
  });

  // Brand + group + tag + search all narrow the category's items further.
  filteredItems = computed(() => {
    let list = this.categoryItems();

    const brand = this.selectedBrand();
    if (brand) {
      list = list.filter((item) => item.brand?.label === brand);
    }

    const groups = this.selectedGroups();
    if (groups.size) {
      list = list.filter((item) => item.group && groups.has(item.group.code));
    }

    const tags = this.selectedTags();
    if (tags.size) {
      list = list.filter((item) => item.tags && tags.has(item.tags.code));
    }

    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      list = list.filter((item) =>
        [item.name, item.description, item.category?.label, item.allergen?.label]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query),
      );
    }

    return list;
  });

  // One horizontal-scroll section per group, in the same order as the
  // group pills, containing only the items that survive the active filters.
  // Some categories (e.g. Tandoor) have no group set on any item, so fall
  // back to a single section rather than hiding the dishes entirely.
  groupSections = computed(() => {
    const items = this.filteredItems();
    const groupList = this.groups();
    if (!groupList.length) {
      return items.length
        ? [{ code: '__all__', label: this.activeCategory(), items }]
        : [];
    }
    return groupList
      .map((group) => ({
        ...group,
        items: items.filter((item) => item.group?.code === group.code),
      }))
      .filter((section) => section.items.length > 0);
  });

  logoUrl = APP_CONFIG.logoUrl;

  // The CMS-hosted allergen icon URLs (APP_CONFIG.allergen*Url) 404 on the
  // live site, so allergens are drawn as inline SVGs keyed by this code
  // instead of fetched images.
  private readonly allergenPatterns: Array<[RegExp, string]> = [
    [/dairy|milk/i, 'dairy'],
    [/gluten/i, 'gluten'],
    [/nuts?/i, 'nuts'],
    [/sulphite/i, 'sulphites'],
    [/egg/i, 'egg'],
    [/fish/i, 'fish'],
    [/mustard/i, 'mustard'],
    [/alcohol/i, 'alcohol'],
  ];

  allergenIcons(item: MenuProduct): string[] {
    const label = item.allergen?.label;
    if (!label) return [];
    const icons: string[] = [];
    for (const [pattern, code] of this.allergenPatterns) {
      if (pattern.test(label)) icons.push(code);
    }
    return icons;
  }

  private readonly allergenLabels: Record<string, string> = {
    dairy: 'Dairy / Milk',
    gluten: 'Gluten',
    nuts: 'Nuts',
    sulphites: 'Sulphites',
    egg: 'Egg',
    fish: 'Fish',
    mustard: 'Mustard',
    alcohol: 'Alcohol',
  };

  allergenLabel(code: string): string {
    return this.allergenLabels[code] ?? code;
  }

  private readonly allergenColors: Record<string, string> = {
    dairy: '#8b6bc9',
    mustard: '#d4a72c',
    sulphites: '#4fa898',
    gluten: '#b08a4e',
    nuts: '#c1793c',
    egg: '#e0b53a',
    fish: '#4a90c4',
    alcohol: '#b5495b',
  };

  allergenColor(code: string): string {
    return this.allergenColors[code] ?? 'var(--terracotta, #c75100)';
  }

  allergenInfoItem = signal<MenuProduct | null>(null);

  openAllergenInfo(item: MenuProduct) {
    this.allergenInfoItem.set(item);
  }

  closeAllergenInfo() {
    this.allergenInfoItem.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeAllergenInfo();
  }

  ngOnInit() {
    this.listingApi
      .loadAll()
      .then((items) => this.items.set(items))
      .catch(() => this.items.set([]));
  }

  selectBrand(brand: string | null) {
    this.selectedBrand.set(brand);
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.selectedGroups.set(new Set());
  }

  toggleTag(code: string) {
    const next = new Set(this.selectedTags());
    if (next.has(code)) {
      next.delete(code);
    } else {
      next.add(code);
    }
    this.selectedTags.set(next);
  }

  toggleGroup(code: string) {
    const next = new Set(this.selectedGroups());
    if (next.has(code)) {
      next.delete(code);
    } else {
      next.add(code);
    }
    this.selectedGroups.set(next);
  }

  formatPrice(price: number | null): string {
    return price == null ? '' : `£${price.toFixed(0)}`;
  }
}
