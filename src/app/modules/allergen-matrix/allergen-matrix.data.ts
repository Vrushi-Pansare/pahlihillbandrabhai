import { AllergenCategory } from './allergen.model';

/**
 * Transcribed from Allergens28thJuly2026.pdf (kitchen allergen sheet, June 2026).
 * "Milk" is the statutory allergen the sheet labels "Dairy".
 * This mirrors the kitchen sheet — always confirm with staff before ordering.
 */
export const ALLERGEN_MATRIX: AllergenCategory[] = [
  {
    id: 'small-plates',
    title: 'Small Plates',
    dishes: [
      {
        name: 'Coastal Harvest',
        options: 'Broccoli',
        contains: ['Milk'],
        note: 'Can be made without dairy; can be made without broccoli.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Coastal Harvest',
        options: 'Crab',
        contains: ['Milk', 'Crustaceans'],
        note: 'Can be made without dairy.',
      },
      {
        name: 'Papadums & Chutney Trio',
        contains: ['Milk', 'Mustard', 'Sulphites'],
        mayContain: ['Gluten', 'Nuts', 'Sesame', 'Soya', 'Celery'],
        note: 'No allergens in the papads themselves — “may contain” is from shared production areas. Dairy, mustard & sulphites are in the chutneys only.',
        vegetarian: true,
      },
      {
        name: 'Hara Kebab',
        contains: ['Gluten', 'Milk'],
        note: 'Dairy is in the mint chutney only — swap to tamarind, mango or guntoor chutney to remove it.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Papadi Chaat',
        contains: ['Gluten', 'Milk'],
        vegetarian: true,
      },
      {
        name: 'Sweet Potato Chaat',
        contains: ['Milk'],
        note: 'Batter is gram (chickpea) flour and gluten-free. Dairy is from the yoghurt and mint chutney.',
        vegetarian: true,
      },
      {
        name: 'Bombay Pav Bhaji',
        contains: ['Gluten', 'Milk', 'Eggs'],
        vegetarian: true,
      },
      {
        name: 'Andhra Calamari',
        contains: ['Gluten', 'Molluscs'],
      },
      {
        name: 'Mangalore Bun & Crab Sukkha',
        contains: ['Gluten', 'Milk', 'Mustard', 'Crustaceans'],
      },
      {
        name: 'Kothu Roti',
        options: 'Coorg Pork',
        contains: ['Gluten', 'Milk'],
      },
      {
        name: 'Kothu Roti',
        options: 'Lamb',
        contains: ['Gluten', 'Milk', 'Mustard'],
      },
      {
        name: 'Benne Dosa Tacos',
        options: 'Chilli Cheese',
        contains: ['Milk', 'Mustard'],
        vegetarian: true,
      },
      {
        name: 'Benne Dosa Tacos',
        options: 'Lamb',
        contains: ['Milk', 'Mustard'],
      },
    ],
  },
  {
    id: 'tandoor',
    title: 'Tandoor',
    dishes: [
      {
        name: 'Beetroot Kakori Seekh',
        contains: ['Milk'],
        note: 'Dairy is in the mint chutney on the side — swap to mango or another vegan chutney to remove it.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Tandoori Broccoli',
        contains: ['Nuts', 'Milk'],
        note: 'Nuts are almonds — can be made without nuts.',
        vegetarian: true,
      },
      {
        name: 'Achari Paneer Tikka',
        contains: ['Mustard', 'Milk'],
        vegetarian: true,
      },
      {
        name: 'Tandoori Malai Chicken',
        contains: ['Milk'],
      },
      {
        name: 'Pahli Hill Chicken Tikka',
        contains: ['Mustard', 'Milk'],
      },
      {
        name: 'Kandhari Lamb Chops',
        contains: ['Mustard', 'Milk'],
      },
      {
        name: 'Tandoori Monkfish',
        contains: ['Mustard', 'Milk', 'Fish'],
      },
    ],
  },
  {
    id: 'mains',
    title: 'Mains',
    dishes: [
      {
        name: 'Palak',
        options: 'Paneer',
        contains: ['Milk'],
        note: 'Can be made vegan — swap paneer for potato and skip the cream garnish.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Palak',
        options: 'Aloo',
        contains: ['Milk'],
        note: 'Dairy is the cream garnish only — skip it for a vegan dish.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Paneer Makhani',
        contains: ['Nuts', 'Milk'],
        note: 'Nuts are cashews.',
        vegetarian: true,
      },
      {
        name: 'Homestyle Chicken Curry',
        contains: ['Milk'],
      },
      {
        name: 'Lamb Pepper Fry Masala',
        contains: ['Mustard'],
      },
      {
        name: 'Butter Chicken',
        contains: ['Nuts', 'Milk', 'Mustard'],
        note: 'Nuts are cashews.',
      },
      {
        name: 'Heritage Biryani',
        options: 'Jackfruit | Chicken | Lamb',
        contains: ['Milk'],
        mayContain: ['Peanuts', 'Mustard', 'Sesame'],
        note: 'The biryani itself contains only dairy. The salan served alongside has mustard, peanuts & sesame.',
      },
      {
        name: 'Mangalorean Fish Curry',
        contains: ['Milk', 'Mustard', 'Fish'],
      },
      {
        name: 'Kerala Prawn Curry',
        contains: ['Milk', 'Mustard', 'Crustaceans'],
      },
      {
        name: 'Lamb Shank Nihari',
        contains: ['Milk'],
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    dishes: [
      {
        name: 'Dal Tadka',
        contains: [],
        note: 'Allergen-free.',
        vegetarian: true,
        veganOption: true,
      },
      { name: 'Jackfruit Nihari', contains: ['Milk'], vegetarian: true },
      { name: 'Pindi Channa', contains: ['Milk'], vegetarian: true },
      { name: 'Tender Jackfruit', contains: ['Milk', 'Mustard'], vegetarian: true },
      { name: 'Black Dal', contains: ['Milk'], vegetarian: true },
      {
        name: 'Okra Masala',
        contains: [],
        note: 'Allergen-free.',
        vegetarian: true,
        veganOption: true,
      },
      { name: 'Guntoor Chilli Chutney', contains: ['Sulphites'], vegetarian: true },
      { name: 'Mango Chutney', contains: ['Mustard'], vegetarian: true },
      { name: 'Pahli Hill Pickle', contains: ['Mustard'], vegetarian: true },
      { name: 'Seasoned Yoghurt', contains: ['Milk'], vegetarian: true },
      {
        name: 'Chutney Flight',
        contains: ['Milk', 'Mustard', 'Sulphites'],
        note: 'Mint, mango & guntoor chutneys.',
        vegetarian: true,
      },
    ],
  },
  {
    id: 'breads-rice',
    title: 'Breads & Rice',
    dishes: [
      { name: 'Bombay Bun', contains: ['Gluten', 'Milk', 'Eggs'], vegetarian: true },
      {
        name: 'Naan',
        options: 'Butter | Garlic | Plain',
        contains: ['Gluten', 'Milk'],
        vegetarian: true,
      },
      {
        name: 'Tandoori Roti / Lachha Paratha',
        contains: ['Gluten'],
        note: 'Can be made vegan — no ghee on top.',
        vegetarian: true,
        veganOption: true,
      },
      {
        name: 'Pahli Hill Flaky Flat Bread',
        contains: ['Gluten', 'Milk'],
        vegetarian: true,
      },
      { name: 'Chilli Cheese Kulcha', contains: ['Gluten', 'Milk'], vegetarian: true },
      { name: 'Garlic Cheese Kulcha', contains: ['Gluten', 'Milk'], vegetarian: true },
      { name: "Chef's Bread Basket", contains: ['Gluten', 'Milk'], vegetarian: true },
      {
        name: 'Cumin Rice',
        contains: ['Gluten', 'Milk'],
        note: 'Flagged for gluten & dairy on the kitchen sheet (shared equipment) — confirm with staff.',
        vegetarian: true,
      },
      {
        name: 'Steamed Basmati Rice',
        contains: ['Gluten', 'Milk'],
        note: 'Flagged for gluten & dairy on the kitchen sheet (shared equipment) — confirm with staff.',
        vegetarian: true,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    dishes: [
      {
        name: 'Kulfi Kataifi',
        options: 'Saffron',
        contains: ['Milk', 'Nuts', 'Gluten', 'Soya'],
        note: 'Nuts are pistachio; gluten is the kataifi. For nut-free, ask for no garnish.',
        vegetarian: true,
      },
      {
        name: 'Kulfi Kataifi',
        options: 'Smoked Paprika',
        contains: ['Milk', 'Gluten', 'Soya'],
        note: 'Gluten & soya are the kataifi — a plain kulfi is dairy only.',
        vegetarian: true,
      },
      {
        name: 'Rabdi Tres Leches',
        contains: ['Gluten', 'Milk', 'Eggs'],
        mayContain: ['Nuts', 'Soya'],
        vegetarian: true,
      },
      {
        name: 'Carrot Halwa',
        contains: ['Milk', 'Nuts', 'Sulphites'],
        note: 'Nuts are pistachio & cashew.',
        vegetarian: true,
      },
      {
        name: 'Mango Cheesecake',
        contains: ['Gluten', 'Milk'],
        note: 'Contains pork gelatin — please inform the kitchen of dietary needs.',
        vegetarian: true,
      },
      { name: 'Smoked Paprika Ice Cream', contains: ['Milk'], vegetarian: true },
      { name: 'Saffron Kulfi', contains: ['Milk'], vegetarian: true },
      { name: 'Vanilla Ice Cream', contains: ['Milk'], vegetarian: true },
      {
        name: 'Pistachio Ice Cream',
        contains: ['Milk', 'Nuts'],
        note: 'Nuts are pistachio.',
        vegetarian: true,
      },
      { name: 'Parsi Caramel Ice Cream', contains: ['Milk'], vegetarian: true },
      {
        name: 'Mango Sorbet',
        contains: [],
        note: 'Allergen-free.',
        vegetarian: true,
        veganOption: true,
      },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    dishes: [
      {
        name: 'Parle-G (chai biscuit)',
        contains: ['Milk', 'Mustard', 'Soya'],
        vegetarian: true,
      },
    ],
  },
  {
    id: 'cocktails',
    title: 'Cocktails',
    dishes: [
      { name: 'Basanti', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Veeru', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Kingpin Lassi', contains: ['Milk'] },
      { name: 'Phantom', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Delhi Mule', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Dancho Don', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Veerapan', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Malabar Run', contains: [], note: 'Allergen-free.', veganOption: true },
      {
        name: 'Baba Budan',
        contains: ['Nuts'],
        note: 'Nuts are hazelnut.',
      },
      { name: 'Natwarlal', contains: [], note: 'Allergen-free.', veganOption: true },
    ],
  },
  {
    id: 'mocktails',
    title: 'Mocktails & Soft Drinks',
    dishes: [
      { name: 'Ruby Spritz', contains: [], note: 'Allergen-free.', veganOption: true },
      {
        name: 'Nimbu Soda',
        options: 'Salty | Sweet | Mixed',
        contains: [],
        note: 'Allergen-free.',
        veganOption: true,
      },
      { name: 'Grapefruit Mojito', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Pomegranate', contains: [], note: 'Allergen-free.', veganOption: true },
      { name: 'Original Mango Lassi', contains: ['Milk'] },
      { name: 'Masala Chai', contains: ['Milk'] },
    ],
  },
  {
    id: 'beers-meads',
    title: 'Beers & Meads',
    dishes: [
      {
        name: 'Braybrooke Helles Lager 4.2%',
        contains: ['Gluten'],
        note: 'On tap.',
        veganOption: true,
      },
      {
        name: 'Bombay Bicycle IPA 4.4%',
        contains: ['Gluten'],
        note: 'On tap.',
        veganOption: true,
      },
      {
        name: 'Bunta Citrus Lager 0.5%',
        contains: [],
        note: 'Bottled · gluten-free.',
        veganOption: true,
      },
      {
        name: 'Barhi Original Fresh Date Spritz 6%',
        contains: ['Sulphites'],
        veganOption: true,
      },
      {
        name: 'Barhi Spiced Fresh Date Spritz 6%',
        contains: ['Sulphites'],
        veganOption: true,
      },
    ],
  },
];
