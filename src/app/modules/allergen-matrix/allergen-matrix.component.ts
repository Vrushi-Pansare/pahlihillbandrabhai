import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ALLERGEN_MATRIX } from './allergen-matrix.data';
import { Allergen, ALLERGENS, AllergenCategory } from './allergen.model';

const PDF_URL =
  'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-19T14:37:34.449Z/Allergens28thJuly2026.pdf';

type Diet = 'vegetarian' | 'vegan';

@Component({
  selector: 'app-allergen-matrix',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './allergen-matrix.component.html',
  styleUrl: './allergen-matrix.component.scss',
})
export class AllergenMatrixComponent {
  readonly pdfUrl = PDF_URL;
  readonly allergens = ALLERGENS;

  readonly query = signal('');
  /** Allergens the guest wants to avoid — dishes containing them are hidden. */
  readonly excluded = signal<Set<Allergen>>(new Set());
  readonly diet = signal<Diet | null>(null);

  readonly filtered = computed<AllergenCategory[]>(() => {
    const q = this.query().trim().toLowerCase();
    const avoid = this.excluded();
    const diet = this.diet();

    return ALLERGEN_MATRIX.map((cat) => ({
      ...cat,
      dishes: cat.dishes.filter((dish) => {
        if (q) {
          const hay = `${dish.name} ${dish.options ?? ''} ${dish.note ?? ''}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (diet === 'vegetarian' && !dish.vegetarian && !dish.veganOption) {
          return false;
        }
        if (diet === 'vegan' && !dish.veganOption) return false;
        if (avoid.size) {
          const all = [...dish.contains, ...(dish.mayContain ?? [])];
          if (all.some((a) => avoid.has(a))) return false;
        }
        return true;
      }),
    })).filter((cat) => cat.dishes.length > 0);
  });

  readonly resultCount = computed(() =>
    this.filtered().reduce((n, cat) => n + cat.dishes.length, 0),
  );

  readonly hasFilters = computed(
    () =>
      this.query().trim().length > 0 ||
      this.excluded().size > 0 ||
      this.diet() !== null,
  );

  onSearch(value: string): void {
    this.query.set(value);
  }

  toggleAllergen(a: Allergen): void {
    const next = new Set(this.excluded());
    next.has(a) ? next.delete(a) : next.add(a);
    this.excluded.set(next);
  }

  isExcluded(a: Allergen): boolean {
    return this.excluded().has(a);
  }

  toggleDiet(d: Diet): void {
    this.diet.set(this.diet() === d ? null : d);
  }

  clearAll(): void {
    this.query.set('');
    this.excluded.set(new Set());
    this.diet.set(null);
  }
}
