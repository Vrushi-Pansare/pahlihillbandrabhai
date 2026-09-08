import { Menu } from './menu.model';

/** Transcribed from Grab&Go2026.pdf (19 Aug 2026). Prices in GBP. */
export const GRAB_AND_GO: Menu = {
  slug: 'grab-and-go',
  title: 'Grab & Go',
  intro:
    'Curry bowls and hand-rolled kathi wraps to take away. All bowls come with steamed basmati rice.',
  pdfUrl:
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-19T14:46:56.418Z/Grab&Go2026.pdf',
  footnotes: [
    'All bowls are paired with steamed basmati rice.',
    'Kathi is a popular Indian wrap — freshly hand-made crispy bread with tasty fillings, salad & chutneys.',
    'We make every effort to avoid cross-contamination, but cannot guarantee dishes and drinks are allergen-free. If you have any food-related allergies or dietary requirements, please let us know.',
  ],
  groups: [
    {
      id: 'bowls',
      title: 'Bowls',
      sections: [
        {
          id: 'bowls-non-veg',
          title: 'Non-Veg Bowls',
          caption: 'From £14 · prawn £19',
          items: [
            { name: 'Homestyle Chicken Curry Bowl', price: '14' },
            { name: 'Butter Chicken Bowl', price: '14' },
            { name: 'Mangalorean Fish Curry Bowl', price: '19' },
            { name: 'Highway Lamb Curry Bowl', price: '19' },
            { name: 'Prawn Curry Bowl', price: '19' },
          ],
        },
        {
          id: 'bowls-veggie',
          title: 'Veggie Bowls',
          caption: 'Each £12',
          items: [
            { name: 'Palak Paneer Bowl', price: '12' },
            { name: 'Paneer Makhani Bowl', price: '12' },
            { name: 'Black Dal Bowl', price: '12' },
          ],
        },
        {
          id: 'bowls-vegan',
          title: 'Vegan Bowls',
          caption: 'Each £10',
          items: [
            { name: 'Dal Tadka Bowl', price: '10', tags: ['vegan-option'] },
            { name: 'Palak Aloo Bowl', price: '10', tags: ['vegan-option'] },
          ],
        },
      ],
    },
    {
      id: 'wraps',
      title: 'Kathi Wraps',
      sections: [
        {
          id: 'wraps-non-veg',
          title: 'Non-Veg Kathi',
          caption: 'Each £11',
          items: [
            { name: 'Chicken Tikka Kathi', price: '11' },
            { name: 'Butter Chicken Kathi', price: '11' },
            { name: 'Pork Shoulder Kathi', price: '11' },
          ],
        },
        {
          id: 'wraps-veggie',
          title: 'Veggie Kathi',
          caption: 'Each £8',
          items: [
            { name: 'Hara Kebab Kathi', price: '8' },
            { name: 'Paneer Makhani Kathi', price: '8' },
          ],
        },
      ],
    },
    {
      id: 'add-ons',
      title: 'Add-Ons',
      sections: [
        {
          id: 'add-ons-sides',
          title: 'Sides & Chutneys',
          caption: 'Each £3',
          items: [
            { name: 'Cucumber & Mint Salad', price: '3' },
            { name: 'Guntoor Chilli & Garlic Chutney', price: '3' },
            { name: 'Mango Chutney', price: '3' },
            { name: 'Mint Chutney', price: '3' },
          ],
        },
        {
          id: 'add-ons-gravies',
          title: 'Just-Dunk Gravies',
          caption: '30ml · each £3',
          items: [
            { name: 'Makhani Gravy', price: '3' },
            { name: 'Chicken Curry Gravy', price: '3' },
          ],
        },
      ],
    },
  ],
};
