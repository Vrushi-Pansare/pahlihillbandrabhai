import { Menu } from './menu.model';

/**
 * Transcribed from PresentALaCarte.pdf (19 Aug 2026).
 * Prices in GBP, as printed. Keep in sync with the source PDF.
 */
export const A_LA_CARTE: Menu = {
  slug: 'a-la-carte',
  title: 'À la Carte',
  intro:
    'Regional Indian cooking designed to share — small plates, tandoor, coastal curries and breads, with drinks by Bandra Bhai. Dishes arrive as they are ready.',
  pdfUrl:
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-19T14:50:51.580Z/PresentALaCarte.pdf',
  footnotes: [
    'All dishes come as they’re ready. Our menu is designed to share.',
    'We make every effort to avoid cross-contamination, but cannot guarantee dishes and drinks are allergen-free. If you have any food-related allergies or dietary requirements, please let us know.',
    'A 12.5% discretionary service charge is added to your bill.',
    'Publicly voted London’s favourite Indian restaurant 2025 — FACT Dining Awards.',
  ],
  groups: [
    {
      id: 'food',
      title: 'Food',
      sections: [
        {
          id: 'small-plates',
          title: 'Small Plates',
          items: [
            {
              name: 'Coastal Harvest',
              options: 'Broccoli | Crab',
              desc: 'Tamarind & mint vinaigrette, mixed greens & pomegranate',
              price: '10 | 13',
              tags: ['new'],
            },
            {
              name: 'Hara Kebab',
              desc: 'Spinach, ginger, rosevale potato, green peas, bird eye chilli, mint & tamarind chutney',
              price: '15',
              tags: ['special'],
            },
            {
              name: 'Papadi Chaat',
              desc: 'Yoghurt, datterini tomato, pomegranate, mint & tamarind chutney',
              price: '15',
              tags: ['special'],
            },
            {
              name: 'Kothu Roti',
              options: 'Lamb | Butter Chicken',
              desc: 'Yoghurt & black pepper | Makhani chicken tikka & coriander stems',
              price: '15',
              tags: ['new'],
            },
            {
              name: 'Sweet Potato Chaat',
              desc: 'Yoghurt, datterini tomato, pomegranate, mint & tamarind chutney',
              price: '16',
              tags: ['new'],
            },
            {
              name: 'Bombay Pav Bhaji',
              desc: 'Brioche bun, rosevale potato, cauliflower & spring peas',
              price: '16',
            },
            {
              name: 'Benne Dosa Tacos',
              options: 'Chilli Cheese | Pulled Lamb',
              desc: 'Tomato chutney & coconut chutney',
              price: '13 | 16',
              tags: ['special'],
            },
            {
              name: 'Andhra Calamari',
              desc: 'Guntoor chilli chutney, lemon & sweet potato',
              price: '17',
            },
            {
              name: 'Mangalore Bun & Crab Sukkha',
              desc: 'Fennel seeds, ginger, coconut milk & curry leaves',
              price: '17',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'tandoor',
          title: 'Tandoor',
          items: [
            {
              name: 'Beetroot Kakori Seekh',
              desc: 'Rosevale potatoes, ginger, kashmiri chilli & mint chutney',
              price: '18',
              tags: ['new'],
            },
            {
              name: 'Tandoori Broccoli',
              desc: 'Cream cheese, toasted almonds, rose petals & guntoor chilli chutney',
              price: '19',
              tags: ['special'],
            },
            {
              name: 'Achari Paneer Tikka',
              desc: 'Mustard, bombay onion, pahli hill pickle & mint chutney',
              price: '20',
            },
            {
              name: 'Tandoori Malai Chicken',
              desc: 'Cream cheese, mace, cardamom, coriander, mint salad & chutney',
              price: '21',
            },
            {
              name: 'Pahli Hill Chicken Tikka',
              desc: 'Cucumber, coriander & mint chutney',
              price: '24',
              tags: ['special'],
            },
            {
              name: 'Tandoori Monkfish',
              desc: 'Turmeric, mustard, smoked paprika & british blistered corn',
              price: '30',
            },
            {
              name: 'Kandhari Lamb Chops',
              desc: 'Yoghurt, mustard, mint chutney & south indian tadka carrot salad',
              price: '35 (2 pcs) | 55 (4 pcs)',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'mains',
          title: 'Mains',
          items: [
            {
              name: 'Palak',
              options: 'Paneer | Aloo',
              desc: 'Spinach, fresh ginger, chillies, plum tomato, brown onion & fenugreek leaves',
              price: '21',
              tags: ['vegan-option'],
            },
            {
              name: 'Homestyle Chicken Curry',
              desc: 'Yoghurt, star anise, coriander seeds & fennel',
              price: '27',
            },
            {
              name: 'Paneer Makhani | Butter Chicken',
              desc: 'Plum tomatoes, cashews, cardamom & fenugreek',
              price: '26 | 30',
              tags: ['special'],
            },
            {
              name: 'Lamb Pepper Fry Masala',
              desc: 'Mustard, black pepper, curry leaves & coconut',
              price: '31',
              tags: ['new'],
            },
            {
              name: 'Lamb Shank Nihari',
              desc: 'Yoghurt, star anise, cinnamon & fried onions',
              price: '33',
              tags: ['special'],
            },
            {
              name: 'Heritage Biryani',
              options: 'Jackfruit | Chicken | Lamb',
              desc: 'Cucumber raita & banana chilli salan',
              price: '18 | 30 | 33',
              tags: ['new'],
            },
            {
              name: 'Kerala Prawn Curry',
              desc: 'Coconut milk, curry leaves, mustard seeds & turmeric',
              price: '33',
              tags: ['new'],
            },
            {
              name: 'Mangalorean Fish Curry',
              desc: 'Wild halibut, green mango, ginger & coconut',
              price: '35',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'sides',
          title: 'Sides',
          items: [
            { name: 'Jackfruit Nihari', price: '7', tags: ['new'] },
            { name: 'Dal Tadka', price: '8', tags: ['vegan-option'] },
            { name: 'Pindi Channa', price: '10' },
            { name: 'Okra Masala', price: '11', tags: ['vegan-option'] },
            { name: 'Black Dal', price: '11', tags: ['special'] },
            { name: 'Guntoor Chilli Chutney', price: '3' },
            { name: 'Mango Chutney', price: '3' },
            { name: 'Chutney Flight', price: '6' },
            {
              name: 'Papadums & Chutney Trio',
              desc: 'Mint, guntoor chilli & mango',
              price: '9',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'breads-rice',
          title: 'Breads & Rice',
          items: [
            {
              name: 'Tandoori Roti / Lachha Paratha',
              price: '4.5',
              tags: ['vegan-option'],
            },
            {
              name: 'Pahli Hill Flaky Flat Bread',
              price: '5',
              tags: ['special'],
            },
            {
              name: 'Naan',
              options: 'Garlic | Butter | Plain',
              price: '7',
              tags: ['special'],
            },
            { name: 'Garlic Cheese Kulcha', price: '9' },
            { name: 'Garlic Chilli Cheese Kulcha', price: '9' },
            {
              name: "Chef's Bread Basket",
              desc: 'Tandoori roti, butter naan & flaky flat bread',
              price: '14',
              tags: ['special'],
            },
            { name: 'Cumin Rice', price: '8', tags: ['special'] },
            { name: 'Steamed Basmati Rice', price: '8' },
          ],
        },
      ],
    },
    {
      id: 'drinks',
      title: 'Drinks by Bandra Bhai',
      sections: [
        {
          id: 'non-alcoholic',
          title: 'Non-Alcoholic',
          items: [
            {
              name: 'Nimbu Soda',
              options: 'Salty | Sweet | Mixed',
              desc: 'Lime juice, black salt / sugar syrup & soda water',
              price: '7',
            },
            {
              name: 'Grapefruit Mojito',
              desc: 'Grapefruit juice, sugar syrup, mint & soda',
              price: '7',
              tags: ['special'],
            },
            {
              name: 'Original Mango Lassi',
              desc: 'Yogurt, mango pulp, milk, saffron & lime',
              price: '8',
            },
            {
              name: 'Ruby Spritz',
              desc: 'Ruby Fort concoction, triple sec, lemonade & Lyre’s',
              price: '8',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'beers',
          title: 'Beers',
          items: [
            {
              name: 'Braybrooke Helles Lager 4.2%',
              desc: 'On tap — schooner',
              price: '7',
            },
            {
              name: 'Barhi Spiced Fresh Date Spritz 6%',
              desc: 'On tap. Dates, honey, star anise, orange peel & just 1.5g of sugar (gluten-free)',
              price: '7',
              tags: ['special'],
            },
            {
              name: 'Bunta Citrus Lager 0.5%',
              desc: 'Bottled & can',
            },
            {
              name: 'Cobra Lager 4.5%',
              desc: 'Bottled & can',
              price: '7',
            },
            {
              name: 'Barhi Original Fresh Date Spritz 6%',
              desc: 'The world’s first fresh date spritz — a modern alternative to beer, cider & wine. Dates, honey & just 1.5g of sugar (gluten-free)',
              price: '7',
              tags: ['special'],
            },
          ],
        },
        {
          id: 'cocktails',
          title: 'Cocktails',
          caption: 'All cocktails £14',
          items: [
            {
              name: 'Kingpin Lassi',
              desc: 'Desi Daru Mango Vodka, yoghurt, lime & Briottet Mangue',
              note: 'A clarified mango lassi with vodka, inspired by Punjab’s legendary smugglers. Smooth, rich and deceptively strong.',
              price: '14',
              tags: ['special'],
            },
            {
              name: 'Phantom',
              desc: 'Mijenta Blanco, orange chilli cordial, absinthe, Tajín & lime',
              note: 'Phantom Singh, the elusive smuggler never caught. Bold, mysterious and unpredictable.',
              price: '14',
            },
            {
              name: 'Delhi Mule',
              desc: 'Hapusa Gin, Khoosh bitters, ginger, tonic & lime',
              note: 'Bold, mysterious and layered.',
              price: '14',
              tags: ['special'],
            },
            {
              name: 'Dancho Don',
              desc: 'Woodford Reserve, Jade Perique tabac, demerara, Dr. Hostetter’s, Angostura & oak wood',
              note: 'In the dimly lit corners of Old Delhi, the Dancho Don sat back with a sutta in one hand and a deal in the other.',
              price: '14',
              tags: ['special'],
            },
            {
              name: 'Veerapan',
              desc: 'Spiced Ten To One Rum, cinnamon & jaggery & lime',
              note: 'Inspired by India’s notorious bandit — rich, fiery and unpredictable.',
              price: '14',
            },
            {
              name: 'Malabar Run',
              desc: 'Mijenta Reposado, pepper-infused mezcal, cinnamon, jaggery, coke & lime',
              note: 'A tribute to Kerala’s pepper smugglers.',
              price: '14',
            },
            {
              name: 'Basanti',
              desc: 'Edwards Rhubarb Vodka, lychee purée & rose',
              note: 'A smuggler no one could catch and everyone swore they’d seen.',
              price: '14',
            },
            {
              name: 'Natwarlal',
              desc: 'Salcombe Gin, Cointreau, butterfly pea, sugar & lime',
              note: 'Butterfly-pea gin morphs from blue to pink with a squeeze of lime.',
              price: '14',
            },
          ],
        },
        {
          id: 'wines',
          title: 'Wines',
          caption: 'Price per 125ml | bottle · extended wine list available',
          items: [
            {
              name: 'Aubert & Mathieu “Kate” 2023',
              desc: 'Sauvignon Blanc · aromatic & dry · Languedoc-Roussillon, France',
              price: '7 | 30',
            },
            {
              name: 'Gavi di Gavi “La Minaia”, Nicola Bergaglio 2025',
              desc: 'Cortese · crisp, dry & refreshing · Piemonte, Italy',
              price: '11 | 40',
            },
            {
              name: 'Embrujo Tempranillo Organic, Bodegas Verum 2024',
              desc: 'Tempranillo · fresh & fruity · Spain',
              price: '7 | 30',
            },
            {
              name: 'Valpolicella Valpantena DOC, Bertani 2024',
              desc: 'Corvina Veronese, Rondinella · medium-bodied · Veneto, Italy',
              price: '11 | 40',
            },
          ],
        },
      ],
    },
  ],
};
