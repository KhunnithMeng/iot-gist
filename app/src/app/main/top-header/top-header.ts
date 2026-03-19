import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-top-header',
  imports: [],
  templateUrl: './top-header.html',
  styleUrl: './top-header.scss',
})
export class TopHeader {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  title = signal('');
  breadcrumb = signal('');

  constructor() {
    this.getRouteEvent();
  }

  private getRouteEvent() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getDeepestChild(this.activatedRoute)),
        map((activeRoute) => {
          const snapshot = activeRoute.snapshot;
          return {
            title: snapshot.title ?? '',
            breadcrumb: snapshot.data['breadcrumb'] ?? ''
          };
        })
      )
      .subscribe(({ title, breadcrumb }) => {
        this.title.set(title);
        this.breadcrumb.set(breadcrumb);
      });
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

}
