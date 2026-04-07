import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { Device } from '../../../../models/device.model';
import { Subject, takeUntil } from 'rxjs';
import { DeviceInteractionService } from '../../../../services/device-interaction.service';
import { DeckMapData } from '../../../../models/deck-map';

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

  public updateDevice(deckMapDataList: DeckMapData<Device>[]) {
    if (!deckMapDataList || deckMapDataList.length === 0) return;

    const hasIcon: boolean = deckMapDataList.some(deckMapData => deckMapData.map.svg && deckMapData.map.svg.length > 0);
    if (hasIcon) {
      const iconLayer = this.deckMapLayerService.createIconLayer(deckMapDataList);
      this.deckMapService.addLayer(iconLayer);
    }

    const hasPath: boolean = deckMapDataList.some(deckMapData => deckMapData.map.path && deckMapData.map.path.length > 0);
    if (hasPath) {
      const pathLayer = this.deckMapLayerService.createPathLayer(deckMapDataList);
      this.deckMapService.addLayer(pathLayer);
    }
  }

  public clear() {
    this.deckMapService.close();
    this.subscriptionSignal.unsubscribe();
  }

}
