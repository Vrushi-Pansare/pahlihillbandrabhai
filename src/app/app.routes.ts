import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { TeamComponent } from './modules/team/team.component';
import { PrivateHiresComponent } from './modules/private-hires/private-hires.component';
import { SpeakeasyComponent } from './modules/speakeasy/speakeasy.component';
import { WhyUniqueComponent } from './modules/why-unique/why-unique.component';
import { MenuCategoryComponent } from './modules/menu-category/menu-category.component';
import { FullMenuComponent } from './modules/full-menu/full-menu.component';
import { AllergenMenuComponent } from './modules/allergen-menu/allergen-menu.component';
import { FaqComponent } from './modules/faq/faq.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Best Indian Restaurant London | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Pahli Hill Bandra Bhai brings South Bombay supper-house cooking to Fitzrovia — bold Indian small plates, chaat, chai and cocktails at 79–81 Mortimer Street, London.',
    },
  },
  {
    path: 'about',
    component: AboutUsComponent,
    title: 'About Us | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'The story behind Pahli Hill Bandra Bhai: a South Bombay supper-house reborn on Mortimer Street, Fitzrovia, serving generous home-style Indian cooking in central London.',
    },
  },
  {
    path: 'about/team',
    component: TeamComponent,
    title: 'Meet The Team | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Meet the chefs, hosts and makers behind Pahli Hill Bandra Bhai — the people bringing Bombay hospitality and home-style Indian cooking to Fitzrovia, London.',
    },
  },
  {
    path: 'team',
    component: TeamComponent,
    title: 'Meet The Team | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Meet the chefs, hosts and makers behind Pahli Hill Bandra Bhai — the people bringing Bombay hospitality and home-style Indian cooking to Fitzrovia, London.',
    },
  },
  {
    path: 'private-hires',
    component: PrivateHiresComponent,
    title: 'Private Hires | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Host your event at Pahli Hill Bandra Bhai in Fitzrovia — private dining and full venue hire for celebrations, parties and corporate events in central London.',
    },
  },
  {
    path: 'speakeasy',
    component: SpeakeasyComponent,
    title: 'The Speakeasy | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Step into the speakeasy at Pahli Hill Bandra Bhai — a hidden Fitzrovia bar pouring Bombay-inspired cocktails, chai and late-night drinks beneath Mortimer Street.',
    },
  },
  {
    path: 'why-unique',
    component: WhyUniqueComponent,
    title: "Why We're Unique | Pahli Hill Bandra Bhai – Fitzrovia",
    data: {
      description:
        'What makes Pahli Hill Bandra Bhai different: South Bombay supper-house flavours, radical hospitality and the tech to back it up, on Mortimer Street in Fitzrovia.',
    },
  },
  {
    path: 'full-menu',
    component: FullMenuComponent,
    title: 'Full Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'The full Pahli Hill Bandra Bhai menu — Bombay supper-house small plates, tandoor, mains and more, served at Mortimer Street in Fitzrovia, London.',
    },
  },
  {
    path: 'allergen-menu',
    component: AllergenMenuComponent,
    title: 'Allergen Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Filter the Pahli Hill Bandra Bhai menu by the 14 UK FSA allergens — tap what you avoid and see every dish and drink you can safely order in Fitzrovia, London.',
    },
  },
  {
    path: 'faq',
    component: FaqComponent,
    title: 'FAQ | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Answers to common questions about Pahli Hill Bandra Bhai — bookings, walk-ins, allergens, Halal meat, private dining, accessibility, opening hours and corkage in Fitzrovia, London.',
    },
  },
  {
    path: 'ai-concierge',
    // Lazy: only the knowledge service is needed at startup (AppComponent).
    loadComponent: () =>
      import('./modules/ai-concierge/ai-concierge.component').then(
        (m) => m.AiConciergeComponent,
      ),
    title: 'AI Concierge | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Ask the Pahli Hill AI Concierge anything — dishes, allergens, opening hours, private hires and what to order tonight at our Indian restaurant in Fitzrovia, London.',
    },
  },
  {
    path: 'menu/:code',
    component: MenuCategoryComponent,
    title: 'Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'Browse the Pahli Hill Bandra Bhai menu — Bombay supper-house small plates, tandoor and more, served at Mortimer Street in Fitzrovia, London.',
    },
  },
  { path: '**', redirectTo: '' },
];
