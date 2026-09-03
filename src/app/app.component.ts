import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, skip } from 'rxjs/operators';

declare let fbq: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pahlihillbandrabhai';

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to router events for route changes to perfectly fire Pixel PageView in a Single Page App.
    // We skip the first NavigationEnd event because the snippet in index.html already fires a PageView on initial load.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      skip(1) // Skip initial page load
    ).subscribe(() => {
      // It is important to wrap it in a setTimeout to ensure the route change has fully updated the DOM/title if needed
      setTimeout(() => {
        if (typeof fbq === 'function') {
          fbq('track', 'PageView');
        }
      }, 0);
    });
  }
}

