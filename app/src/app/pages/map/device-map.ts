import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { DeviceMapService } from './device-map.service';
import { DeviceService } from '../../../../services/device.service';
import { Device } from '../../../../models/device.model';
import { DeviceInfoSidebar } from '../device-info-sidebar/device-info-sidebar';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  imports: [
    DeviceInfoSidebar
  ],
  standalone: true,
  templateUrl: './device-map.html',
  styleUrl: './device-map.scss',
})
export class DeviceMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainerRef', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>

  subscription!: Subscription;

  constructor(private mapService: DeviceMapService,
              private deviceService: DeviceService) {
  }

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapContainerRef.nativeElement);
    this.fetchDevices();
    this.subscription = interval(5000).subscribe(res => {
      this.fetchDevices();
    });
  }

  private fetchDevices() {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.mapService.updateDevice(devices);
    })
  }

  ngOnDestroy() {
    this.mapService.clear();
    this.subscription?.unsubscribe();
  }
}
