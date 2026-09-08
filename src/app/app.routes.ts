import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { TeamComponent } from './modules/team/team.component';
import { PrivateHiresComponent } from './modules/private-hires/private-hires.component';
import { SpeakeasyComponent } from './modules/speakeasy/speakeasy.component';
import { WhyUniqueComponent } from './modules/why-unique/why-unique.component';

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
  { path: '**', redirectTo: '' },
];
