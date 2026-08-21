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

  selectedMember: any = null;

  openMemberModal(member: any): void {
    this.selectedMember = member;
    document.body.style.overflow = 'hidden';
  }

  closeMemberModal(): void {
    this.selectedMember = null;
    document.body.style.overflow = '';
  }

  teamMembers = [
    {
      name: 'Shourrya',
      role: 'General Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:30:34.016Z/Shourrya.jpg',
      description:
        '"The Guest gets what the guest wants" - Entrepreneurial general manager blending strategy, operations, leadership and guest-focused and employee morale hospitality. "JACK OF ALL TRADES MASTER OF MANY"',
      bio: '"The Guest gets what the guest wants" - Entrepreneurial general manager blending strategy, operations, leadership and guest-focused and employee morale hospitality.\n\n"JACK OF ALL TRADES MASTER OF MANY"',
      experience:
        '13 years of Leadership and other role experiences across India, London BiBi, Pahli Hill, Hoppers, Tendril and Cafe Petiole Somerset house, plus founding and scaling a dessert based brand called Crepe-fe in Delhi from 2017, he brings expertise in menu building, operations, finance, compliance, team motivation and guest experience.',
      whatGotThemIn:
        'Coming from an entrepreneurial family, he was drawn more to hi mother\'s kitchen than his father\'s office. It was hi mother who recognised early on that hospitality was the natural path for him.',
      funFact:
        'Used to fix potholes in new delhi during weekends with team members. Been an entrepenuer my whole career of 12 years this is the first time an employee.',
    },
    {
      name: 'Mahesh',
      role: 'Head Chef',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:23:52.215Z/Mahesh.jpg',
      description:
        'A deeply experienced head chef known for warmth, craft and quiet excellence.',
      bio: 'A deeply experienced head chef known for warmth, craft and quiet excellence.',
      experience:
        'Originally from Uttarakhand and born in Mumbai, Mahesh brings 35 years of culinary experience. His journey has taken him through The Leela Hotel Group, Taj Hotels, Café Naaz Group, Bombay Brasserie and Dishoom, before joining Pahli Hill.',
      whatGotThemIn:
        'A lifelong dedication to cooking, service and consistency has shaped his path in hospitality. For him, the greatest reward is seeing guests enjoy the food, return with appreciation, and feel genuinely looked after.',
      funFact: 'Guests often come back just to shake his hand after the meal.',
    },
    {
      name: 'Nikhil',
      role: 'Restaurant Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:40:46.651Z/Nikhil.jpg',
      description:
        'Energetic restaurant manager driven by resilience, momentum, people, and solutions.',
      bio: 'Energetic restaurant manager driven by resilience, momentum, people, and solutions.',
      experience:
        'Started in a café and patisserie, later becoming a working partner and director. Built hands-on experience across operations, team leadership and business growth, learning how to run and evolve a hospitality business.',
      whatGotThemIn:
        'Inspired by family entrepreneurship and the fast, immediate nature of service, they were drawn to hospitality for its energy, human connection and the chance to solve problems in real time.',
      funFact:
        'They go from zero to full momentum in seconds and love skating.',
    },
    {
      name: 'Rose',
      role: 'Reservations Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:39:45.456Z/Rose.jpg',
      description:
        'Ambitious FOH professional with warmth, drive, leadership, poise and acumen.',
      bio: 'Ambitious FOH professional with warmth, drive, leadership, poise and acumen.',
      experience:
        'Mary Rose holds an MSc in International Business Management from Coventry University and a finance-focused business degree from Mumbai University, both with distinction, alongside a CMI Level 7 qualification in strategic management and leadership practices.',
      whatGotThemIn:
        'Childhood visits to a dosa restaurant in Mumbai, where the rush of service and ringing kitchen bells filled the room with energy, sparked her early love for hospitality and led her to seize the opportunity in the UK.',
      funFact:
        'Outside the restaurant, she is also a YouTuber with a creative side.',
    },
    {
      name: 'Guru',
      role: 'Bar Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:38:42.826Z/Guru.jpg',
      description:
        'Engineering graduate turned bar manager, blending technical thinking with hospitality.',
      bio: 'Engineering graduate turned bar manager, blending technical thinking with hospitality.',
      experience:
        'Gurutej holds an MSc in Advanced Electronics and Electrical Engineering and brings experience as Permanent Bar Manager at Pahli Hill Bandra Bhai, overseeing daily operations, staff coordination, inventory, customer relations and compliance.',
      whatGotThemIn:
        'A background in leadership, hospitality operations and customer management led them towards an industry where communication, adaptability and problem-solving are central, allowing them to work closely with people in a fast-paced environment.',
      funFact:
        'Outside service, he is interested in AI, IoT and smart systems.',
    },
    {
      name: 'Yash',
      role: 'Bandra Bhai Manager',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:37:23.670Z/Yash.jpg',
      description:
        'Warm, grounded hospitality manager shaped by family, service, and ambition.',
      bio: 'Warm, grounded hospitality manager shaped by family, service, and ambition.',
      experience:
        'Raised in a multi-generational family restaurant business in India, they developed hands-on experience early. After moving to London in 2022, they progressed from runner to manager, building strong skills across service, operations, and diverse regional cuisines.',
      whatGotThemIn:
        'Hospitality was part of daily life from childhood, surrounded by family, food, and the rhythm of restaurants. That early familiarity, combined with a genuine love of people and cooking, made the industry feel like a natural path.',
      funFact:
        'They will happily walk miles across London for a proper cup of chai.',
    },
    {
      name: 'Dipak',
      role: 'Sous Chef',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:35:55.281Z/Dipak.jpg',
      description:
        'Skilled tandoori chef combining authenticity, creativity, discipline and business insight.\n\nPassionate chef bringing creativity, precision and strong leadership to every service.',
      bio: 'Skilled tandoori chef combining authenticity, creativity, discipline and business insight.\n\nPassionate chef bringing creativity, precision and strong leadership to every service.',
      experience:
        'With experience across Hotel Annapurna Guarden, Indigo Rasoi and now Pahli Hill Bandra Bhai, Dipak has led kitchen operations, developed menus, managed teams, maintained food safety standards, and controlled stock and costs.',
      whatGotThemIn:
        'A passion for cooking and the joy of making people happy through food inspired his journey into hospitality. The creativity, teamwork and energy of busy kitchens motivated him to build a long-term career as a chef.',
      funFact:
        'He can plate beautifully under pressure while singing his favourite songs.',
    },
    {
      name: 'Sanam',
      role: 'Chef de Partie',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-21T13:26:53.828Z/Sanam.jpg',
      description:
        'A skilled chef known for consistency, focus and calm under pressure.',
      bio: 'A skilled chef known for consistency, focus and calm under pressure.',
      experience:
        'Experienced in fast-paced kitchens, with strengths in section management, stock control, hygiene and team support.',
      whatGotThemIn:
        'A passion for food, teamwork and the energy of kitchen service inspired the journey into hospitality.',
      funFact:
        'He has also worked in banking, billing and teaching before becoming a chef.',
    },
    {
      name: 'Baptista Barreto',
      role: 'Chef de Partie',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:34:17.089Z/BaptistaBarreto.jpg',
      description: '',
      bio: '',
      experience: '',
      whatGotThemIn: '',
      funFact: '',
    },
    {
      name: 'Anitha Roadrigas',
      role: 'Commi',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:36.573Z/AnithaRoadrigas.jpg',
      description: '',
      bio: '',
      experience: '',
      whatGotThemIn: '',
      funFact: '',
    },
    {
      name: 'Will',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:32:01.862Z/WillPorter.jpg',
      description:
        'I am Wil, I come from Ivory Coast. I work with the agency 7 to 7. Indeed, thanks to the flexibility of agency work, I was able to discover several restaurants, several working methods and hold several positions. That being said, I have several strings to my bow: k.P., cleaner, waiter and commis chef. Why did you choose the restaurant industry ? I like to eat, I really like to eat. This love My experience with food allowed me to embrace cooking and kitchens with respect and to learn quickly. Did I make the right choice? In any case, I don\'t regret it because health and life are found on the plate. So why not take great care of the plate? Today, I am in PAHLI for a new adventure.',
      bio:
        'I am Wil, I come from Ivory Coast. I work with the agency 7 to 7. Indeed, thanks to the flexibility of agency work, I was able to discover several restaurants, several working methods and hold several positions. That being said, I have several strings to my bow: k.P., cleaner, waiter and commis chef. Why did you choose the restaurant industry ? I like to eat, I really like to eat. This love My experience with food allowed me to embrace cooking and kitchens with respect and to learn quickly. Did I make the right choice? In any case, I don\'t regret it because health and life are found on the plate. So why not take great care of the plate? Today, I am in PAHLI for a new adventure.',
      experience: '',
      whatGotThemIn: '',
      funFact: '',
    },
    {
      name: 'Vamos',
      role: 'Porter',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T12:31:27.589Z/VamosPorter.jpg',
      description:
        'Hello, I am Vamos, a kitchen porter recognized for my good humor and positive attitude.\nI was born in Côte d\'Ivoire, more precisely in Abidjan.',
      bio:
        'Hello, I am Vamos, a kitchen porter recognized for my good humor and positive attitude.\nI was born in Côte d\'Ivoire, more precisely in Abidjan.',
      experience:
        'I have been practicing this profession since 2022 and now have 4 years of experience. I have worked at several prominent establishments in the area, including:\n• Maison François • Kanada Ya • Santo Remedio • Azteca • Ve Kitchen • Beaufort House',
      whatGotThemIn:
        'My approach to work is defined by commitment and dedication. I consistently support the chefs and waiters, ensuring everyone can work in a tranquil and peaceful environment. I bring my joy to the workplace through hard work, discipline, and respect for my colleagues.',
      funFact: 'I am now proud to be part of the team at Pahli Hill.',
    },
    {
      name: 'Sameer',
      role: 'Director',
      image:
        'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-20T11:52:51.525Z/Sameer.jpg',
      description: '',
      bio: '',
      experience: '',
      whatGotThemIn: '',
      funFact: '',
    },
  ];
}
