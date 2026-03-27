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

@Component({
  selector: 'app-map',
  imports: [],
  standalone: true,
  templateUrl: './device-map.html',
  styleUrl: './device-map.scss',
})
export class DeviceMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainerRef', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>

  constructor(private mapService: DeviceMapService,
              private deviceService: DeviceService) {
  }

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapContainerRef.nativeElement);
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.mapService.updateDevice(devices);
    })
  }

  ngOnDestroy() {
    this.mapService.clear();
  }
}
