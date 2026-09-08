export type MenuTag = 'new' | 'special' | 'vegan-option' | 'inform-server';

export interface MenuItem {
  name: string;
  /** Choice line, e.g. "Broccoli | Crab" */
  options?: string;
  /** Ingredient / preparation line */
  desc?: string;
  /** Extra prose (used for cocktail stories) */
  note?: string;
  /** Price as printed, e.g. "15", "10 | 13", "7 · 10 · 21 · 30", "+£3" */
  price?: string;
  tags?: MenuTag[];
}

export interface MenuSection {
  id: string;
  title: string;
  /** Optional line shown under the section title (measures, price, choose-one, …) */
  caption?: string;
  items: MenuItem[];
}

export interface MenuGroup {
  id: string;
  title: string;
  sections: MenuSection[];
}

export interface Menu {
  slug: string;
  title: string;
  intro: string;
  /** Prominent price line, e.g. "2 courses £25 · 3 courses £32" */
  priceBanner?: string;
  /** Original source PDF, kept for download / print */
  pdfUrl: string;
  groups: MenuGroup[];
  footnotes: string[];
}
