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
import { interval, map, Subscription } from 'rxjs';
import { DeviceSocketService } from '../../../../services/device-socket-service';
import { DeckMapData } from '../../../../models/deck-map';

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
              private deviceSocketService: DeviceSocketService) {
  }

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapContainerRef.nativeElement);
    this.subscription = this.deviceSocketService.listen()
      .pipe(map(res => res.data))
      .subscribe((mapDeckDataList: DeckMapData<Device>[]) => {
        this.mapService.updateDevice(mapDeckDataList);
      });
  }

  ngOnDestroy() {
    this.mapService.clear();
    this.subscription?.unsubscribe();
    this.deviceSocketService.disconnect();
  }
}
