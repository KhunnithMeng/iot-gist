import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { DeviceMapService } from './device-map.service';
import { Device } from '../../../../models/device.model';
import { DeviceInfoSidebar } from '../device-info-sidebar/device-info-sidebar';
import { map, Subscription } from 'rxjs';
import { DeviceSocketService } from '../../../../services/device-socket-service';
import { DeckMapData } from '../../../../models/deck-map';
import { DECK_LAYER_HANDLERS } from '../../../../tokens/deck-layer-handlers.token';
import { IconLayerHandlerService } from '../../../../services/deck-layer-handlers/icon-layer-handler.service';
import { PathLayerHandlerService } from '../../../../services/deck-layer-handlers/path-layer-handler.service';

@Component({
  selector: 'app-map',
  imports: [
    DeviceInfoSidebar
  ],
  standalone: true,
  templateUrl: './device-map.html',
  styleUrl: './device-map.scss',
  providers: [
    DeviceMapService,
    {
      provide: DECK_LAYER_HANDLERS,
      useExisting: IconLayerHandlerService,
      multi: true
    },
    {
      provide: DECK_LAYER_HANDLERS,
      useExisting: PathLayerHandlerService,
      multi: true
    }
  ]
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
