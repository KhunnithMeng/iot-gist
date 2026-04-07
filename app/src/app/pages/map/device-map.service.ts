import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { Device } from '../../../../models/device.model';
import { Subject, takeUntil } from 'rxjs';
import { DeviceInteractionService } from '../../../../services/device-interaction.service';
import { DeckMapData } from '../../../../models/deck-map';
import { PathLayerHandlerService } from '../../../../services/deck-layer-handlers/path-layer-handler.service';
import { IconLayerHandlerService } from '../../../../services/deck-layer-handlers/icon-layer-handler.service';
import { DeckLayerHandler } from '../../../../models/deck-layer-handler';

@Injectable({
  providedIn: 'root',
})
export class DeviceMapService {
  private subscriptionSignal: Subject<void> = new Subject();
  private readonly handlers: DeckLayerHandler<Device>[] = [];

  constructor(private deckMapService: DeckMapService,
              private deviceInteractionService: DeviceInteractionService,
              private pathLayerHandlerService: PathLayerHandlerService,
              private iconLayerHandlerService: IconLayerHandlerService,
              private deckMapLayerService: DeckMapLayerService) {
    this.handlers = [this.pathLayerHandlerService, this.iconLayerHandlerService]
  }

  public initializeMap(mapContainer: HTMLDivElement) {
    this.deckMapService.init(mapContainer);
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

  public updateDevice(deckMapDataList: DeckMapData<Device>[]) {
    if (!deckMapDataList?.length) return;

    for (const handler of this.handlers) {
      if (handler.shouldHandle(deckMapDataList)) {
        const layer = handler.createLayer(deckMapDataList);
        this.deckMapService.addLayer(layer);
      }
    }
  }

  public clear() {
    this.deckMapService.close();
    this.subscriptionSignal.unsubscribe();
  }

}
