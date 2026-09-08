import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { TeamComponent } from './modules/team/team.component';
import { PrivateHiresComponent } from './modules/private-hires/private-hires.component';
import { SpeakeasyComponent } from './modules/speakeasy/speakeasy.component';
import { WhyUniqueComponent } from './modules/why-unique/why-unique.component';
import { MenuComponent } from './modules/menu/menu.component';
import { AllergenMatrixComponent } from './modules/allergen-matrix/allergen-matrix.component';
import { A_LA_CARTE } from './modules/menu/a-la-carte.data';
import { SET_LUNCH } from './modules/menu/set-lunch.data';
import { SELECT_MENU } from './modules/menu/select-menu.data';
import { GRAB_AND_GO } from './modules/menu/grab-and-go.data';
import { WINE_LIST } from './modules/menu/wine-list.data';

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
    path: 'menu',
    component: MenuComponent,
    title: 'À la Carte Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: A_LA_CARTE,
      description:
        'The full à la carte menu at Pahli Hill Bandra Bhai, Fitzrovia — small plates, tandoor, coastal curries, breads and drinks by Bandra Bhai. Search every dish and ingredient.',
    },
  },
  {
    path: 'menu/a-la-carte',
    component: MenuComponent,
    title: 'À la Carte Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: A_LA_CARTE,
      description:
        'The full à la carte menu at Pahli Hill Bandra Bhai, Fitzrovia — small plates, tandoor, coastal curries, breads and drinks by Bandra Bhai. Search every dish and ingredient.',
    },
  },
  {
    path: 'menu/set-lunch',
    component: MenuComponent,
    title: 'Set Lunch Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: SET_LUNCH,
      description:
        'The set lunch at Pahli Hill Bandra Bhai, Fitzrovia — two courses £25, three courses £32, served Tuesday to Saturday, 12–5:45pm.',
    },
  },
  {
    path: 'menu/select-menu',
    component: MenuComponent,
    title: 'Select Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: SELECT_MENU,
      description:
        'The Select group menu at Pahli Hill Bandra Bhai, Fitzrovia — a five-course feast at £59 per person for shared celebrations.',
    },
  },
  {
    path: 'menu/grab-and-go',
    component: MenuComponent,
    title: 'Grab & Go Menu | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: GRAB_AND_GO,
      description:
        'Grab & Go from Pahli Hill Bandra Bhai, Fitzrovia — curry bowls with basmati rice and hand-rolled kathi wraps to take away.',
    },
  },
  {
    path: 'menu/wine-list',
    component: MenuComponent,
    title: 'Wine & Spirits List | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      menuData: WINE_LIST,
      description:
        'The wine and spirits list at Pahli Hill Bandra Bhai, Fitzrovia — wines by the glass and bottle, bin ends, and spirits across grain, agave, barley and more.',
    },
  },
  {
    path: 'menu/allergens',
    component: AllergenMatrixComponent,
    title: 'Allergen Matrix | Pahli Hill Bandra Bhai – Fitzrovia',
    data: {
      description:
        'The full allergen matrix for Pahli Hill Bandra Bhai, Fitzrovia — filter every dish and drink by the 14 statutory allergens and by vegetarian or vegan diet.',
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
  { path: '**', redirectTo: '' },
];
