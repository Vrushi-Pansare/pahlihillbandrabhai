import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { DropdownValue, MenuDropdownApi } from '../header/menu-dropdown.api';
import { APP_CONFIG } from '../../configs/constants';
import { MenuListingApi, MenuProduct } from './menu-listing.api';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.scss',
})
export class MenuCategoryComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly zone = inject(NgZone);
  private readonly dropdownApi = new MenuDropdownApi(
    APP_CONFIG.dropdownValuesApiUrl,
  );
  private readonly listingApi = new MenuListingApi(APP_CONFIG.listingApiUrl);

  private code = '';
  private label = '';
  // Guards against a slow earlier response overwriting a newer one when the
  // category changes quickly.
  private requestId = 0;

  categoryLabel = signal('');
  items = signal<MenuProduct[]>([]);
  allergens = signal<DropdownValue[]>([]);
  selectedAllergen = signal<DropdownValue | null>(null);
  query = signal('');

  // Filter pills show two rows until expanded. Row count depends on screen
  // width, so the cut-off height is measured from the rendered pills.
  private static readonly COLLAPSED_ROWS = 2;
  private pillsObserver?: ResizeObserver;
  private pillsEl?: HTMLElement;
  pillsExpanded = signal(false);
  pillsOverflow = signal(false);
  pillsCollapsedHeight = signal(0);

  // Local search over the dishes already loaded; every word must match
  // somewhere in the dish's name, description, tag or allergen.
  filteredItems = computed(() => {
    const terms = this.query().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return this.items();
    return this.items().filter((item) => {
      const haystack = [
        item.name,
        item.description,
        item.tags?.label,
        item.allergen?.label,
      ]
        .join(' ')
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  });
  loading = signal(true);
  error = signal(false);
  notFound = signal(false);

  @ViewChild('pills') set pillsRef(ref: ElementRef<HTMLElement> | undefined) {
    this.pillsObserver?.disconnect();
    this.pillsEl = ref?.nativeElement;
    if (!this.pillsEl) return;
    this.pillsObserver = new ResizeObserver(() =>
      this.zone.run(() => this.measurePills()),
    );
    this.pillsObserver.observe(this.pillsEl);
    // Wrapping changes once the web font swaps in.
    void document.fonts?.ready.then(() => this.zone.run(() => this.measurePills()));
  }

  ngOnInit() {
    // The filter pills are optional, so the page still works if this fails.
    this.dropdownApi
      .load('allergens')
      .then((allergens) => this.allergens.set(allergens))
      .catch(() => this.allergens.set([]));

    this.route.paramMap.subscribe((params) => {
      this.code = params.get('code') ?? '';
      this.label = '';
      this.categoryLabel.set('');
      this.selectedAllergen.set(null);
      this.query.set('');
      void this.load();
    });
  }

  ngOnDestroy() {
    this.pillsObserver?.disconnect();
  }

  togglePills() {
    this.pillsExpanded.update((expanded) => !expanded);
  }

  private measurePills() {
    const container = this.pillsEl;
    if (!container) return;
    const pills = Array.from(container.children) as HTMLElement[];
    const rowTops = [...new Set(pills.map((pill) => pill.offsetTop))].sort(
      (a, b) => a - b,
    );
    const rows = MenuCategoryComponent.COLLAPSED_ROWS;
    if (rowTops.length <= rows) {
      this.pillsOverflow.set(false);
      return;
    }
    const cutoff = rowTops[rows];
    const height = Math.max(
      ...pills
        .filter((pill) => pill.offsetTop < cutoff)
        .map((pill) => pill.offsetTop + pill.offsetHeight),
    );
    this.pillsCollapsedHeight.set(height);
    this.pillsOverflow.set(true);
  }

  // Clicking the active pill clears the filter.
  selectAllergen(allergen: DropdownValue | null) {
    const current = this.selectedAllergen();
    this.selectedAllergen.set(
      allergen && allergen.code !== current?.code ? allergen : null,
    );
    void this.load();
  }

  retry() {
    void this.load();
  }

  formatPrice(price: number | null): string {
    return price == null ? '' : `£${price.toFixed(2)}`;
  }

  private async load() {
    const id = ++this.requestId;
    this.loading.set(true);
    this.error.set(false);
    this.notFound.set(false);

    try {
      // The listing filters by category label, which we resolve from the
      // dropdown API using the code in the URL.
      if (!this.label) {
        const categories = await this.dropdownApi.load('productCategories');
        const match = categories.find((c) => c.code === this.code);
        if (id !== this.requestId) return;
        if (!match) {
          this.items.set([]);
          this.notFound.set(true);
          return;
        }
        this.label = match.label;
        this.categoryLabel.set(match.label);
        this.titleService.setTitle(
          `${match.label} | Pahli Hill Bandra Bhai – Fitzrovia`,
        );
      }

      const items = await this.listingApi.load(
        this.label,
        this.selectedAllergen()?.label,
      );
      if (id !== this.requestId) return;
      this.items.set(items);
    } catch {
      if (id !== this.requestId) return;
      this.error.set(true);
    } finally {
      if (id === this.requestId) this.loading.set(false);
    }
  }
}
