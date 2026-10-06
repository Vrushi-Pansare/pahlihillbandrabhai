import { BOOKING_URL, RESERVATIONS_EMAIL } from '../modules/faq/faq.data';

// House facts the AI Concierge shows in its side cards and answers from.
// Same values as the footer and the JSON-LD block in index.html; keep them
// in step when hours or contact details change.
export interface OpeningHours {
  days: string;
  opens: string;
  closes: string;
}

export const RESTAURANT_INFO = {
  name: 'Pahli Hill Bandra Bhai',
  addressLines: ['79–81 Mortimer Street', 'Fitzrovia, London W1W 7SJ'],
  mapsUrl: 'https://www.google.com/maps?q=79-81+Mortimer+Street,+London+W1W+7SJ',
  phoneDisplay: '+44 20 8130 0101',
  phoneHref: 'tel:+442081300101',
  email: RESERVATIONS_EMAIL,
  bookingUrl: BOOKING_URL,
  instagram: 'https://www.instagram.com/pahlihillbandrabhaiuk',
  giftCardsUrl: 'https://pahlihillbandrabhai.giftpro.co.uk/',
  hours: [
    { days: 'Mon – Sat', opens: '12:00', closes: '22:00' },
    { days: 'Sunday', opens: '12:00', closes: '17:00' },
  ] as OpeningHours[],
  floors:
    'Pahli Hill is the ground-floor restaurant; Bandra Bhai is the basement speakeasy cocktail bar. Both serve the same menu.',
  about:
    "South Bombay supper-house cooking in Fitzrovia: bold Indian small plates, tandoor, chaat, chai and cocktails. Voted London's Best Indian Restaurant by FACT 2025; featured in The Times, GQ, Vogue and Condé Nast Traveller.",
};
