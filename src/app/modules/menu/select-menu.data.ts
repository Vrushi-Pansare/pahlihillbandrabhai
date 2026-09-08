import { Menu } from './menu.model';

/** Transcribed from SELECTMenus.pdf (20 Aug 2026). Prices in GBP. */
export const SELECT_MENU: Menu = {
  slug: 'select-menu',
  title: 'Select Menu',
  priceBanner: '£59 per person',
  intro:
    'A set feasting menu for groups — choose one dish from each course. Ideal for a shared celebration.',
  pdfUrl:
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T11:25:57.280Z/SELECTMenus.pdf',
  footnotes: [
    'Choose one dish per course, for the whole table.',
    'We make every effort to avoid cross-contamination, but cannot guarantee dishes and drinks are allergen-free. If you have any food-related allergies or dietary requirements, please let us know.',
    'A 12.5% discretionary service charge is added to your bill.',
    'Supplements (“+ £3” / “+ £8”) apply to the dishes marked.',
  ],
  groups: [
    {
      id: 'select-menu',
      title: 'Five Courses · £59pp',
      sections: [
        {
          id: 'drinks',
          title: 'Drinks',
          items: [
            {
              name: 'Original Mango Lassi',
              desc: 'Yogurt, mango pulp, milk, saffron & lime',
            },
            {
              name: 'Masala Chai',
              desc: 'Cardamom, milk, black pepper, cloves & ginger',
              tags: ['vegan-option'],
            },
            {
              name: 'Grapefruit Mojito',
              desc: 'Grapefruit juice, sugar syrup, mint & soda',
            },
          ],
        },
        {
          id: 'starters',
          title: 'Starters',
          items: [
            {
              name: 'Papadi Chaat',
              desc: 'Yoghurt, tomato, pomegranate, mint & tamarind chutney',
              tags: ['vegan-option'],
            },
            {
              name: 'Hara Kebab',
              desc: 'Spinach, ginger, rosevale potato, bird’s eye chilli, mint & tamarind chutney',
              tags: ['vegan-option'],
            },
            {
              name: 'Mangalore Bun & Crab Sukkha',
              desc: 'Fennel seeds, ginger, coconut milk & curry leaves',
            },
            {
              name: 'Benne Dosa Tacos — Chilli Cheese',
              desc: 'Tomato chutney & coconut chutney',
            },
          ],
        },
        {
          id: 'tandoor',
          title: 'Tandoor',
          items: [
            {
              name: 'Tandoori Broccoli',
              desc: 'Cream cheese, toasted almond & guntoor chilli chutney',
            },
            {
              name: 'Pahli Hill Chicken Tikka',
              desc: 'Cucumber, coriander & mint chutney',
            },
            {
              name: 'Kandhari Lamb Chops',
              desc: 'Yoghurt, mustard, mint chutney & south indian carrot salad',
              price: '+ £8',
            },
          ],
        },
        {
          id: 'mains',
          title: 'Mains',
          caption: 'Choose steamed or cumin rice',
          items: [
            {
              name: 'Paneer Makhani',
              desc: 'Plum tomatoes, cashews, cream & fenugreek leaves',
            },
            {
              name: 'Homestyle Chicken Curry',
              desc: 'Yoghurt, star anise, coriander seeds & fennel',
            },
            {
              name: 'Butter Chicken',
              desc: 'Cashews, cardamom & fenugreek butter',
            },
            {
              name: 'Mangalorean Fish Curry',
              desc: 'Wild halibut, green mango, ginger & coconut',
            },
            {
              name: 'Lamb Pepper Fry Masala',
              desc: 'Mustard, black pepper, curry leaves & coconut',
              price: '+ £3',
            },
          ],
        },
        {
          id: 'desserts',
          title: 'Desserts',
          items: [
            { name: 'Mango Sorbet' },
            { name: 'Saffron Kulfi' },
          ],
        },
      ],
    },
  ],
};
