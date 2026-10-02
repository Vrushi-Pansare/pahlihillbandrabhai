import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { APP_CONFIG } from '../../configs/constants';
import { MenuListingApi, MenuProduct } from '../menu-category/menu-listing.api';

interface AllergenDef {
  code: string;
  label: string;
  color: string;
  pattern: RegExp;
}

type Brand = 'food' | 'bar';

// The API sends one combined allergen label per product
// ("GLUTEN - DAIRY - MUSTARD") with inconsistent spelling ("CRUSTCEANS",
// "SULPHUR"), so each part is matched against this list to get a stable code,
// colour and icon. Order matters: peanuts must be tested before tree nuts.
// It is also the order the tiles appear in.
const ALLERGENS: AllergenDef[] = [
  { code: 'gluten', label: 'Gluten', color: '#d4a72c', pattern: /gluten|wheat/i },
  { code: 'dairy', label: 'Dairy / Milk', color: '#b46aa8', pattern: /dairy|milk|lactose/i },
  { code: 'peanuts', label: 'Peanuts', color: '#e07b2c', pattern: /peanut/i },
  { code: 'nuts', label: 'Tree Nuts', color: '#c8453c', pattern: /nuts?/i },
  { code: 'egg', label: 'Egg', color: '#7fb0a8', pattern: /egg/i },
  { code: 'fish', label: 'Fish', color: '#4f9a6a', pattern: /fish/i },
  { code: 'crustaceans', label: 'Crustaceans', color: '#e0702c', pattern: /crust/i },
  { code: 'molluscs', label: 'Molluscs', color: '#c8453c', pattern: /mollus/i },
  { code: 'mustard', label: 'Mustard', color: '#d4a72c', pattern: /mustard/i },
  { code: 'sesame', label: 'Sesame', color: '#e88a2c', pattern: /sesame/i },
  { code: 'soya', label: 'Soybeans', color: '#a86aa8', pattern: /soy/i },
  { code: 'celery', label: 'Celery', color: '#7fb0b0', pattern: /celery/i },
  { code: 'sulphites', label: 'Sulphites', color: '#8ab8b0', pattern: /sulph|sulf/i },
  { code: 'lupin', label: 'Lupin', color: '#8aa84a', pattern: /lupin/i },
  { code: 'alcohol', label: 'Alcohol', color: '#b5495b', pattern: /alcohol/i },
];

const FSA_14 = new Set(
  ALLERGENS.map((a) => a.code).filter((code) => code !== 'alcohol'),
);

// Placeholder values some products carry instead of leaving allergen empty.
const NO_ALLERGEN = /^(none|nil|n\/?a|-)$/i;

@Component({
  selector: 'app-allergen-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './allergen-menu.component.html',
  styleUrl: './allergen-menu.component.scss',
})
export class AllergenMenuComponent implements OnInit {
  private readonly listingApi = new MenuListingApi(APP_CONFIG.listingApiUrl);
  private readonly allergenDefs = new Map(ALLERGENS.map((a) => [a.code, a]));

  logoUrl = APP_CONFIG.logoUrl;

  items = signal<MenuProduct[]>([]);
  loading = signal(true);

  // The Dishes / Drinks counters double as the Food / Bar filter. Both are
  // on by default; at least one always stays on.
  selectedBrands = signal<ReadonlySet<Brand>>(new Set<Brand>(['food', 'bar']));

  // Allergens the guest wants to avoid. This is an exclusion filter:
  // tapping Fish hides every item that declares fish.
  excludedAllergens = signal<ReadonlySet<string>>(new Set());

  selectedCategory = signal<string | null>(null);

  // Allergen codes per product, parsed once per load rather than on every
  // change-detection pass.
  private allergenIndex = computed(() => {
    const index = new Map<string, string[]>();
    for (const item of this.items()) {
      index.set(item.id, this.parseAllergens(item.allergen?.label));
    }
    return index;
  });

  brandItems = computed(() => {
    const brands = this.selectedBrands();
    return this.items().filter((item) => brands.has(this.brandOf(item)));
  });

  // Tiles are always exactly the 14 FSA allergens (the legal list, two rows
  // of seven), so a guest can tap one even when nothing on tonight's menu
  // declares it. Non-FSA labels such as Alcohol still show on the item
  // cards, they just aren't filterable.
  allergens = computed(() => ALLERGENS.filter((a) => FSA_14.has(a.code)).map((a) => a.code));

  private isSafe = (item: MenuProduct) => {
    const excluded = this.excludedAllergens();
    return !this.allergenCodes(item).some((code) => excluded.has(code));
  };

  safeDishCount = computed(
    () => this.items().filter((i) => this.brandOf(i) === 'food' && this.isSafe(i)).length,
  );

  safeDrinkCount = computed(
    () => this.items().filter((i) => this.brandOf(i) === 'bar' && this.isSafe(i)).length,
  );

  safeItems = computed(() => this.brandItems().filter(this.isSafe));

  // Every category the brand serves, in API order, with how many of its
  // items survive the allergen filter.
  categories = computed(() => {
    const counts = new Map<string, number>();
    for (const item of this.brandItems()) {
      const label = item.category?.label;
      if (label && !counts.has(label)) counts.set(label, 0);
    }
    for (const item of this.safeItems()) {
      const label = item.category?.label;
      if (label) counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()].map(([label, count]) => ({ label, count }));
  });

  // Falls back to the first category that still has items, so excluding an
  // allergen never leaves the guest looking at an empty section they didn't
  // pick.
  activeCategory = computed(() => {
    const cats = this.categories();
    const selected = cats.find((c) => c.label === this.selectedCategory());
    if (selected && selected.count > 0) return selected.label;
    return cats.find((c) => c.count > 0)?.label ?? selected?.label ?? '';
  });

  activeItems = computed(() =>
    this.safeItems().filter((item) => item.category?.label === this.activeCategory()),
  );

  activeIsBar = computed(() => {
    const items = this.activeItems();
    return items.length > 0 && items.every((item) => this.brandOf(item) === 'bar');
  });

  ngOnInit() {
    this.listingApi
      .loadAll()
      .then((items) => this.items.set(items))
      .catch(() => this.items.set([]))
      .finally(() => this.loading.set(false));
  }

  toggleBrand(brand: Brand) {
    const next = new Set(this.selectedBrands());
    if (next.has(brand)) {
      if (next.size === 1) return;
      next.delete(brand);
    } else {
      next.add(brand);
    }
    this.selectedBrands.set(next);
  }

  toggleAllergen(code: string) {
    const next = new Set(this.excludedAllergens());
    if (next.has(code)) {
      next.delete(code);
    } else {
      next.add(code);
    }
    this.excludedAllergens.set(next);
  }

  clearAllergens() {
    this.excludedAllergens.set(new Set());
  }

  selectCategory(label: string) {
    this.selectedCategory.set(label);
  }

  allergenCodes(item: MenuProduct): string[] {
    return this.allergenIndex().get(item.id) ?? [];
  }

  allergenLabel(code: string): string {
    return this.allergenDefs.get(code)?.label ?? code.replace(/-/g, ' ');
  }

  allergenColor(code: string): string {
    return this.allergenDefs.get(code)?.color ?? '#c75100';
  }

  formatPrice(price: number | null): string {
    return price == null ? '' : `£${price.toFixed(2)}`;
  }

  // Bar items are tagged with a bar/drinks brand; anything without a brand
  // is treated as food.
  private brandOf(item: MenuProduct): Brand {
    const brand = `${item.brand?.code ?? ''} ${item.brand?.label ?? ''}`;
    return /\bbar\b|drink/i.test(brand) ? 'bar' : 'food';
  }

  private parseAllergens(label: string | undefined): string[] {
    if (!label || NO_ALLERGEN.test(label.trim())) return [];
    const codes = new Set<string>();
    for (const raw of label.split(/\s*(?:[-,/&|+]|\band\b)\s*/i)) {
      const part = raw.trim();
      if (!part || NO_ALLERGEN.test(part)) continue;
      const def = ALLERGENS.find((a) => a.pattern.test(part));
      codes.add(def ? def.code : part.toLowerCase().replace(/\s+/g, '-'));
    }
    return [...codes];
  }
}
