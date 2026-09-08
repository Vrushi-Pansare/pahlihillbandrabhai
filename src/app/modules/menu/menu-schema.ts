import { Menu } from './menu.model';

const SITE = 'https://pahlihillbandrabhai.com';

/** First numeric value in a printed price string, or null (supplements, "market"). */
function parsePrice(price?: string): string | null {
  if (!price) return null;
  if (/^\s*\+/.test(price)) return null; // "+ £3" supplement, not a standalone price
  const m = price.match(/\d+(?:\.\d+)?/);
  return m ? Number(m[0]).toFixed(2) : null;
}

/**
 * Build schema.org `Menu` JSON-LD from a Menu.
 * Groups become top-level sections; each section its own MenuSection.
 */
export function buildMenuJsonLd(menu: Menu): Record<string, unknown> {
  const url = `${SITE}/menu/${menu.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${url}#menu`,
    name: menu.title,
    url,
    inLanguage: 'en-GB',
    description: menu.intro,
    provider: {
      '@type': 'Restaurant',
      '@id': `${SITE}/#restaurant`,
      name: 'Pahli Hill Bandra Bhai',
      url: `${SITE}/`,
    },
    hasMenuSection: menu.groups.map((group) => ({
      '@type': 'MenuSection',
      name: group.title,
      hasMenuSection: group.sections.map((section) => ({
        '@type': 'MenuSection',
        name: section.title,
        ...(section.caption ? { description: section.caption } : {}),
        hasMenuItem: section.items.map((item) => {
          const price = parsePrice(item.price);
          const description = [item.options, item.desc, item.note]
            .filter(Boolean)
            .join(' — ');
          return {
            '@type': 'MenuItem',
            name: item.name,
            ...(description ? { description } : {}),
            ...(item.tags?.includes('vegan-option')
              ? { suitableForDiet: 'https://schema.org/VeganDiet' }
              : {}),
            ...(price
              ? {
                  offers: {
                    '@type': 'Offer',
                    price,
                    priceCurrency: 'GBP',
                  },
                }
              : {}),
          };
        }),
      })),
    })),
  };
}
