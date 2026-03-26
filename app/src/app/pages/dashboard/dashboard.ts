import { Component, OnInit } from '@angular/core';
import { Map } from '../map/map';
import { DeviceService } from '../../../../services/device.service';
import { Device } from '../../../../models/device.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    Map
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard implements OnInit {
  devices: Device[] = [];
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService.getDevices().subscribe(res => {
      this.devices = res;
    })
  }
}
