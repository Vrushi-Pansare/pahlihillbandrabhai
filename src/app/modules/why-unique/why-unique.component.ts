import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

export interface Pillar {
  number: string;
  title: string;
  body: string;
  iconType: 'camera' | 'heart' | 'battery' | 'refill' | 'clock' | 'flame' | 'wine' | 'leaf';
}

@Component({
  selector: 'app-why-unique',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './why-unique.component.html',
  styleUrl: './why-unique.component.scss',
})
export class WhyUniqueComponent {
  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

  active = 0;
  heroBgUrl = 'assets/Home/space.jpg';

  pillars: Pillar[] = [
    {
      number: '01',
      iconType: 'camera',
      title: 'Live Memory Polaroid Cards',
      body: 'Probably the only ones offering a physical "live memory" with branded photo Polaroid cards. A perfect balance between a personal touch and standardised scalability — avoiding the cliché of signed cards most places do.',
    },
    {
      number: '02',
      iconType: 'heart',
      title: '"Guest Gets What Guest Wants"',
      body: 'Unmatched flexibility in service. Whether it\'s dietary tweaks or special requests, our culture is built on saying "yes". The guest leaves happy, no matter what — breaking the rigid rules often found in fine-casual dining. We over-pour the chai. We send out chaat you didn\'t order. We remember whether you like ice in your whisky. The South Bombay supper-house standard, set on Mortimer Street.',
    },
    {
      number: '03',
      iconType: 'battery',
      title: 'Power-Bank Tables',
      body: 'Thoughtful convenience ingrained in the experience. We offer power banks directly at the table for charging — solving a modern pain point and keeping guests connected and comfortable.',
    },
    {
      number: '04',
      iconType: 'refill',
      title: 'Unlimited Event Refills',
      body: 'For large corporate dinners and events, unlimited canapés and set-menu refills. A generosity rarely seen in London\'s hospitality sector.',
    },
    {
      number: '05',
      iconType: 'clock',
      title: 'Late Hours for Private Hires',
      body: 'Rare find. We let guests party till late, if they wish (provided minimum spend is met). Exceptionally rare across the continent for fine-casual establishments.',
    },
    {
      number: '06',
      iconType: 'flame',
      title: 'Innovation & Authenticity',
      body: 'Regional Indian cooking with authenticity at its core — rooted in tradition, led by flavour, and continually evolving.',
    },
    {
      number: '07',
      iconType: 'wine',
      title: 'A speakeasy below stairs',
      body: 'Down the back staircase, behind an unmarked door, there\'s a Mumbai-1970s cocktail den. Curry-leaf gin, jaggery sours, Indian single malts. Walk-ins, low light, late hours. Knock twice.',
    },
    {
      number: '08',
      iconType: 'leaf',
      title: 'Allergen-true, vegan-serious',
      body: 'Every dish flagged for the 14 statutory allergens, with cross-contamination notes. A real vegan menu — not a sad paneer swap.',
    },
  ];

  scrollToCard(index: number) {
    if (index < 0 || index >= this.pillars.length) return;
    this.active = index;
    if (this.scroller?.nativeElement) {
      const container = this.scroller.nativeElement;
      const card = container.children[index] as HTMLElement;
      if (card) {
        container.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
      }
    }
  }

  onScroll() {
    if (!this.scroller?.nativeElement) return;
    const container = this.scroller.nativeElement;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 1;
    const gap = 16;
    const idx = Math.round(container.scrollLeft / (cardWidth + gap));
    this.active = Math.max(0, Math.min(this.pillars.length - 1, idx));
  }
}
