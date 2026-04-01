import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { DeckMapData } from '../../../../models/deck-map-data';
import { Device } from '../../../../models/device.model';
import { Subject, takeUntil } from 'rxjs';
import { DeviceInteractionService } from '../../../../services/device-interaction.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceMapService {
  private subscriptionSignal: Subject<void> = new Subject();

  constructor(private deckMapService: DeckMapService,
              private deviceInteractionService: DeviceInteractionService,
              private deckMapLayerService: DeckMapLayerService) {}

  public initializeMap(mapContainer: HTMLDivElement) {
    this.deckMapService.init(mapContainer);
    this.initializeMapLayer();
    this.handlingMapEvent();
  }

  private handlingMapEvent() {
    this.deckMapLayerService.clickIcon$
      .pipe(takeUntil(this.subscriptionSignal))
      .subscribe(
        data => this.deviceInteractionService.clickDevice(data));
    this.deckMapLayerService.hoverIcon$
      .pipe(takeUntil(this.subscriptionSignal))
      .subscribe(
        data => this.deviceInteractionService.hoverDevice(data));
  }

  private initializeMapLayer() {
    const iconLayer = this.deckMapLayerService.createIconLayer();
    const pathLayer = this.deckMapLayerService.createPathLayer();

    this.deckMapService.addLayer(iconLayer);
    this.deckMapService.addLayer(pathLayer);
  }

  public updateDevice(devices: Device[]) {
    if (!devices) return;
    const data: DeckMapData[] = devices?.map(this.transformDeviceToDeckMapData.bind(this));
    const iconLayer = this.deckMapLayerService.createIconLayer(data);
    this.deckMapService.updateLayer(iconLayer);
  }

  private transformDeviceToDeckMapData(device: Device): DeckMapData {
    return {
      id: device.id,
      position: device.position,
      name: device.name,
      type: device.type,
      path: device.path,
      updatedAt: device.updatedAt,
      status: device.status
    }
  }

  public clear() {
    this.deckMapService.close();
    this.subscriptionSignal.unsubscribe();
  }

}
