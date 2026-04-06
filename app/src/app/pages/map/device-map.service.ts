import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { Device } from '../../../../models/device.model';
import { Subject, takeUntil } from 'rxjs';
import { DeviceInteractionService } from '../../../../services/device-interaction.service';
import { DeckMapData, DeckMapIcon, DeckMapPath } from '../../../../models/deck-map';
import { MAP_ICONS } from './map-icons';
import { DeviceInfoDisplayStateService } from '../../../../services/device-info-display-state.service';
import { DeviceService } from '../../../../services/device.service';
import { IconLayer } from '@deck.gl/layers';

@Injectable({
  providedIn: 'root',
})
export class DeviceMapService {
  private subscriptionSignal: Subject<void> = new Subject();

  constructor(private deckMapService: DeckMapService,
              private deviceInteractionService: DeviceInteractionService,
              private deviceInfoDisplayService: DeviceInfoDisplayStateService,
              private deviceService: DeviceService,
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

  public updateDevice(deckMapDataList: DeckMapData<Device>[]) {
    if (!deckMapDataList || deckMapDataList.length === 0) return;

    const iconLayer = this.deckMapLayerService.createIconLayer(deckMapDataList);
    this.deckMapService.updateLayer(iconLayer);
  }

  private transformDeviceToDeckMapData(device: Device): DeckMapIcon<Device> {
    return {
      id: device.id,
      svg: MAP_ICONS[device.type],
      position: device.position,
      data: device
    } as DeckMapIcon<Device>
  }

  public clear() {
    this.deckMapService.close();
    this.subscriptionSignal.unsubscribe();
  }

}
