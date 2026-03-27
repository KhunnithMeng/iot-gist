import { Component } from '@angular/core';
import { DeviceMap } from '../map/device-map';

@Component({
  selector: 'app-dashboard',
  imports: [
    DeviceMap
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard {
}
