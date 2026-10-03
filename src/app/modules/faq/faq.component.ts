import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

// A link shown under an answer: `route` for pages on this site, `href` for
// external sites, mailto: and tel:.
export interface FaqLink {
  label: string;
  route?: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  // One string per paragraph.
  answer: string[];
  links?: FaqLink[];
}

const RESERVATIONS_EMAIL = 'reservations@pahlihillbandrabhai.com';
const BOOKING_URL =
  'https://www.sevenrooms.com/explore/pahlihill/reservations/create/search';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  faqs: FaqItem[] = [
    {
      question: 'Do you accept reservations, and how can I book?',
      answer: [
        `Yes, we'd love to have you. Book a table online, call us on +44 20 8130 0101 or email ${RESERVATIONS_EMAIL}.`,
      ],
      links: [
        { label: 'Book a table', href: BOOKING_URL },
        { label: 'Call us', href: 'tel:+442081300101' },
      ],
    },
    {
      question: 'Are walk-ins welcome?',
      answer: [
        'Yes, we accept walk-ins subject to availability; we recommend reserving during busy periods.',
      ],
    },
    {
      question: 'Do you offer delivery or takeaway?',
      answer: [
        'Yes — use the Delivery link on our website for delivery; takeaway is available from our Grab & Go and in-venue collection options.',
      ],
    },
    {
      question: 'Do you have vegetarian, vegan, or gluten-free options?',
      answer: [
        'Yes, our menus feature a range of vegetarian, vegan and gluten-free dishes — please have a look at our menus for more information.',
      ],
      links: [{ label: 'View the full menu', route: '/full-menu' }],
    },
    {
      question: 'How do you handle food allergies and intolerances?',
      answer: [
        'We publish allergen information for every dish on our Allergen Menu. Please tell us about any allergies when booking and on arrival so we can advise safely.',
      ],
      links: [{ label: 'Open the Allergen Menu', route: '/allergen-menu' }],
    },
    {
      question: 'What is the dress code?',
      answer: ['Smart-casual is recommended; there is no strict dress code.'],
    },
    {
      question: 'Can you host private dining, parties, or large groups?',
      answer: [
        `Yes — both Pahli Hill (restaurant) and Bandra Bhai (cocktail bar) host events and group dining. Email ${RESERVATIONS_EMAIL} to plan your event.`,
      ],
      links: [
        { label: 'Private hires', route: '/private-hires' },
        { label: 'Email us', href: `mailto:${RESERVATIONS_EMAIL}` },
      ],
    },
    {
      question: 'Is the venue accessible for guests with mobility needs?',
      answer: [
        'Pahli Hill (our restaurant) is accessible. Bandra Bhai is located in the basement and accessed by stairs; please contact us to discuss accessibility and any assistance you need.',
      ],
    },
    {
      question: 'Is there an age policy for Bandra Bhai?',
      answer: [
        'No. Both of our floors are dining floors — each with its own atmosphere — serving the same menu.',
      ],
    },
    {
      question: 'Do you sell gift cards?',
      answer: [
        'Yes — digital gifting is available via the Gifting section of our website.',
      ],
      links: [
        {
          label: 'View gift cards',
          href: 'https://pahlihillbandrabhai.giftpro.co.uk/',
        },
      ],
    },
    {
      question: 'Are children and pets welcome?',
      answer: [
        'Children are welcome in the restaurant and on the basement dining floor, and all pets are welcome.',
      ],
    },
    {
      question: 'Is there parking nearby or public transport access?',
      answer: [
        'We do not have onsite parking; nearby street parking and public car parks are available, and the venue is well served by public transport.',
      ],
    },
    {
      question: 'Is the meat Halal?',
      answer: [
        `Yes, our meat is Halal. We're happy to share our Halal certification and talk you through it, on site or by email — just email us at ${RESERVATIONS_EMAIL}.`,
        'Please note, we do serve pork from the same kitchen.',
      ],
      links: [{ label: 'Email us', href: `mailto:${RESERVATIONS_EMAIL}` }],
    },
    {
      question: 'What are your timings?',
      answer: [
        "We're open Monday to Saturday, 12pm–10pm, and Sunday, 12pm–5pm. Last orders are usually taken 15 minutes before closing.",
      ],
    },
    {
      question: 'What are your best dishes?',
      answer: [
        'Our top three must-try dishes are the Crab & Bun, Chicken Tikka and Lamb Shank.',
      ],
    },
    {
      question: "What's the best dessert?",
      answer: ['Do try our Rabdi Tres Leches and Mango Cheesecake.'],
    },
    {
      question: 'Do you charge cakeage?',
      answer: [
        "No, we don't charge cakeage — you're welcome to bring your own cake for a celebration.",
      ],
    },
    {
      question: 'What is the corkage?',
      answer: ['Our corkage is £35 per bottle.'],
    },
    {
      question: 'Is the venue air-conditioned?',
      answer: [
        'Yes, our building is entirely air-conditioned, so you stay comfortable even in the intense London summer.',
      ],
    },
  ];
}
