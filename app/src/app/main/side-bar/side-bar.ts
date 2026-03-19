import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {

  navItem = signal([
    { name: 'Dashboard', url: '/dashboard', section: 'Overview' },
    { name: 'Audit Log', url: '/log', section: null },
  ]);
}
