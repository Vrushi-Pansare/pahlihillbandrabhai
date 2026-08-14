import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { PrivateHiresComponent } from './modules/private-hires/private-hires.component';
import { SpeakeasyComponent } from './modules/speakeasy/speakeasy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'private-hires', component: PrivateHiresComponent },
  { path: 'speakeasy', component: SpeakeasyComponent },
  { path: '**', redirectTo: '' },
];
