import { Component } from '@angular/core';
import { Map } from '../map/map';

@Component({
  selector: 'app-dashboard',
  imports: [
    Map
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard {
}
