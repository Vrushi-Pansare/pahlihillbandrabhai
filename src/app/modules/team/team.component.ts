import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { APP_CONFIG } from '../../configs/constants';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  teamPhotoUrl = APP_CONFIG.teamPhotoUrl;
  bananaLeafUrl = APP_CONFIG.bananaLeafUrl;

  teamMembers = [
    {
      name: 'Shourrya',
      role: 'General Manager',
      image: 'https://pahlihillbandrabhai.com/assets/shourrya-DVfkFvrx.jpg',
      description:
        'The Guest gets what the guest wants" - Entrepreneurial general manager blending strategy, operations, leadership and guest-focused hospitality.',
    },
    {
      name: 'Mahesh',
      role: 'Head Chef',
      image: 'https://pahlihillbandrabhai.com/assets/mahesh-Dpuq5aKK.jpg',
      description:
        'A deeply experienced head chef known for warmth, craft and quiet excellence.',
    },
    {
      name: 'Nikhil',
      role: 'Restaurant Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:40:46.651Z/Nikhil.jpg',
      description:
        'Energetic restaurant manager driven by resilience, momentum, people, and solutions.',
    },
    {
      name: 'Rose',
      role: 'Reservations Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:39:45.456Z/Rose.jpg',
      description:
        'Ambitious FOH professional with warmth, drive, leadership, poise and acumen.',
    },
    {
      name: 'Guru',
      role: 'Bar Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:38:42.826Z/Guru.jpg',
      description:
        'Engineering graduate turned bar manager, blending technical thinking with hospitality.',
    },
    {
      name: 'Yash',
      role: 'Bandra Bhai Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:37:23.670Z/Yash.jpg',
      description:
        'Warm, grounded hospitality manager shaped by family, service, and ambition.',
    },
    {
      name: 'Dipak',
      role: 'Sous Chef',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:35:55.281Z/Dipak.jpg',
      description:
        'Skilled tandoori chef combining authenticity, creativity, discipline and business insight.',
    },
    {
      name: 'Sanam',
      role: 'Chef de Partie',
      image: 'https://pahlihillbandrabhai.com/assets/sanam-DyhpJ3AR.jpg',
      description:
        'A skilled chef known for consistency, focus and calm under pressure.',
    },
    {
      name: 'Baptista Barreto',
      role: 'Chef de Partie',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:34:17.089Z/BaptistaBarreto.jpg',
      description:
        'Dedicated chef crafting outstanding textures and delicate regional bites.',
    },
    {
      name: 'Anitha Roadrigas',
      role: 'Commi',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:36.573Z/AnithaRoadrigas.jpg',
      description:
        'Passionate helper learning the secrets of traditional kitchen craft.',
    },
    {
      name: 'Will',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:01.862Z/WillPorter.jpg',
      description:
        'Dedicated team member bringing energy and support to operations.',
    },
    {
      name: 'Vamos',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:31:27.589Z/VamosPorter.jpg',
      description: 'Enthusiastic team member ensuring smooth kitchen workflow.',
    },
    {
      name: 'Sameer',
      role: 'Director',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T11:52:51.525Z/Sameer.jpg',
      description:
        'Visionary strategist driving the spirit of hospitality and character.',
    },
  ];
}
