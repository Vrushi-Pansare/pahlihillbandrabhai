import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { A_LA_CARTE } from './a-la-carte.data';
import { Menu, MenuGroup, MenuItem, MenuSection, MenuTag } from './menu.model';
import { buildMenuJsonLd } from './menu-schema';

const SCHEMA_ID = 'menu-jsonld';

interface TextPart {
  text: string;
  hit: boolean;
}

export const TAG_LABELS: Record<MenuTag, string> = {
  new: 'New on menu',
  special: 'Special',
  'vegan-option': 'Can be vegan',
  'inform-server': 'Inform server',
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly doc = inject(DOCUMENT);

  /** Menu comes from the route's `data.menuData`; falls back to À la Carte. */
  readonly menu: Menu;
  readonly tagLabels = TAG_LABELS;

  constructor(route: ActivatedRoute) {
    this.menu =
      (route.snapshot.data['menuData'] as Menu | undefined) ?? A_LA_CARTE;
  }

  ngOnInit(): void {
    this.removeSchema();
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = SCHEMA_ID;
    script.text = JSON.stringify(buildMenuJsonLd(this.menu));
    this.doc.head.appendChild(script);
  }

  ngOnDestroy(): void {
    this.removeSchema();
  }

  private removeSchema(): void {
    this.doc.getElementById(SCHEMA_ID)?.remove();
  }

  readonly query = signal('');

  /** Sections that still have at least one matching item, with items filtered. */
  readonly filteredGroups = computed<MenuGroup[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) {
      return this.menu.groups;
    }
    return this.menu.groups
      .map((group) => ({
        ...group,
        sections: group.sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
              this.matches(item, section, q),
            ),
          }))
          .filter((section) => section.items.length > 0),
      }))
      .filter((group) => group.sections.length > 0);
  });

  readonly resultCount = computed(() =>
    this.filteredGroups().reduce(
      (total, group) =>
        total +
        group.sections.reduce((sum, section) => sum + section.items.length, 0),
      0,
    ),
  );

  readonly isSearching = computed(() => this.query().trim().length > 0);

  onSearch(value: string): void {
    this.query.set(value);
  }

  clearSearch(): void {
    this.query.set('');
  }

  scrollTo(id: string): void {
    document
      .getElementById('section-' + id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Split text into matched / unmatched parts for highlighting (no innerHTML). */
  parts(text: string | undefined): TextPart[] {
    if (!text) {
      return [];
    }
    const q = this.query().trim();
    if (!q) {
      return [{ text, hit: false }];
    }
    const out: TextPart[] = [];
    const lower = text.toLowerCase();
    const needle = q.toLowerCase();
    let i = 0;
    let found = lower.indexOf(needle, i);
    while (found !== -1) {
      if (found > i) {
        out.push({ text: text.slice(i, found), hit: false });
      }
      out.push({ text: text.slice(found, found + needle.length), hit: true });
      i = found + needle.length;
      found = lower.indexOf(needle, i);
    }
    if (i < text.length) {
      out.push({ text: text.slice(i), hit: false });
    }
    return out;
  }

  private matches(item: MenuItem, section: MenuSection, q: string): boolean {
    const haystack = [
      item.name,
      item.options,
      item.desc,
      item.note,
      section.title,
      ...(item.tags ?? []).map((t) => TAG_LABELS[t]),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  }
}
