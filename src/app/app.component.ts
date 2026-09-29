import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { filter, map, skip } from 'rxjs/operators';

declare let fbq: Function;

const SITE = 'https://pahlihillbandrabhai.com';
const DEFAULT_DESCRIPTION =
  'Pahli Hill Bandra Bhai brings South Bombay supper-house cooking to Fitzrovia — bold Indian small plates, chaat, chai and cocktails at 79–81 Mortimer Street, London.';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pahlihillbandrabhai';

  private readonly doc = inject(DOCUMENT);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    // Keep description, social tags and canonical in sync with the active route.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot;
      })
    ).subscribe(snapshot => {
      const description =
        (snapshot.data['description'] as string | undefined) || DEFAULT_DESCRIPTION;
      const title =
        snapshot.title ||
        'Best Indian Restaurant London | Pahli Hill Bandra Bhai – Fitzrovia';
      const url = SITE + this.router.url.split('?')[0].split('#')[0];

      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.setCanonical(url);
    });

    // Fire a Meta Pixel PageView on client-side route changes (the index.html
    // snippet already fires one on the initial load, so skip the first event).
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      skip(1)
    ).subscribe(() => {
      setTimeout(() => {
        if (typeof fbq === 'function') {
          fbq('track', 'PageView');
        }
      }, 0);
    });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
