/** The 14 UK statutory allergens, plus the labels used on the menu. */
export const ALLERGENS = [
  'Celery',
  'Gluten',
  'Crustaceans',
  'Eggs',
  'Fish',
  'Lupin',
  'Milk',
  'Molluscs',
  'Mustard',
  'Nuts',
  'Peanuts',
  'Sesame',
  'Soya',
  'Sulphites',
] as const;

export type Allergen = (typeof ALLERGENS)[number];

export interface AllergenDish {
  name: string;
  /** e.g. "Broccoli | Crab" */
  options?: string;
  /** Allergens present in the dish as served */
  contains: Allergen[];
  /** "May contain" — shared equipment / trace risk */
  mayContain?: Allergen[];
  /** What the kitchen can flex, or a caveat */
  note?: string;
  vegetarian?: boolean;
  veganOption?: boolean;
}

export interface AllergenCategory {
  id: string;
  title: string;
  dishes: AllergenDish[];
}
