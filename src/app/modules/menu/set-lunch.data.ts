import { Menu } from './menu.model';

/** Transcribed from LunchMenu.pdf (19 Aug 2026). Prices in GBP. */
export const SET_LUNCH: Menu = {
  slug: 'set-lunch',
  title: 'Set Lunch',
  priceBanner: '2 courses £25 · 3 courses £32',
  intro:
    'A three-course set lunch of Pahli Hill favourites — choose one dish per course. Three courses includes tea or coffee.',
  pdfUrl:
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-19T14:49:05.873Z/LunchMenu.pdf',
  footnotes: [
    'Set lunch is available 12 midday to 5:45pm, Tuesday to Saturday.',
    'We make every effort to avoid cross-contamination, but cannot guarantee dishes and drinks are allergen-free. If you have any food-related allergies or dietary requirements, please let us know.',
    'A 12.5% discretionary service charge is added to your bill.',
    '“+ £3” dishes carry a supplement.',
  ],
  groups: [
    {
      id: 'set-lunch',
      title: 'Three Courses',
      sections: [
        {
          id: 'course-1',
          title: 'Small Plates',
          caption: 'Course 1',
          items: [
            {
              name: 'Papadi Chaat',
              desc: 'Yoghurt, datterini tomato, pomegranate, mint & tamarind chutney',
            },
            {
              name: 'Bombay Pav Bhaji',
              desc: 'Brioche bun, rosevale potato, cauliflower & spring peas',
            },
            {
              name: 'Mangalore Bun & Crab Sukkha',
              desc: 'Fennel seeds, ginger, coconut milk & curry leaves',
            },
            {
              name: 'Benne Dosa Tacos — Chilli Cheese',
              desc: 'Tomato chutney & coconut chutney',
              price: '+ £3',
            },
            {
              name: 'Lamb Kothu Roti',
              desc: 'Yoghurt & black pepper',
              price: '+ £3',
            },
          ],
        },
        {
          id: 'course-2',
          title: 'Mains',
          caption: 'Course 2 · choose steamed or cumin rice',
          items: [
            {
              name: 'Palak Aloo',
              desc: 'Spinach, fresh ginger, chillies, plum tomato, brown onion & fenugreek leaves',
            },
            {
              name: 'Paneer Makhani',
              desc: 'Plum tomatoes, cashews, cream & fenugreek leaves',
            },
            {
              name: 'Homestyle Chicken Curry',
              desc: 'Star anise, coriander seeds & fennel',
            },
            {
              name: 'Butter Chicken',
              desc: 'Plum tomatoes, cashews, cardamom & fenugreek',
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
          id: 'course-3',
          title: 'Sweet Plates',
          caption: 'Course 3',
          items: [
            {
              name: 'Rabdi Tres Leches',
              desc: 'Cake, rabdi, cream, almonds, rose petals & pistachios',
            },
            {
              name: 'Mango Cheesecake',
              desc: 'Contains pork gelatin',
            },
            { name: 'Mango Sorbet' },
          ],
        },
      ],
    },
  ],
};
