import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { TeamComponent } from './modules/team/team.component';
import { PrivateHiresComponent } from './modules/private-hires/private-hires.component';
import { SpeakeasyComponent } from './modules/speakeasy/speakeasy.component';
import { WhyUniqueComponent } from './modules/why-unique/why-unique.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Best Indian Restaurant London | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'about', component: AboutUsComponent, title: 'About Us | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'about/team', component: TeamComponent, title: 'Meet The Team | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'team', component: TeamComponent, title: 'Meet The Team | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'private-hires', component: PrivateHiresComponent, title: 'Private Hires | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'speakeasy', component: SpeakeasyComponent, title: 'The Speakeasy | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: 'why-unique', component: WhyUniqueComponent, title: 'Why We\'re Unique | Pahli Hill Bandra Bhai – Fitzrovia' },
  { path: '**', redirectTo: '' },
];

