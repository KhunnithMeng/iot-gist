import { Injectable } from '@angular/core';
import { DeckLayerHandler } from '../../models/deck-layer-handler';
import { Device } from '../../models/device.model';
import { DeckMapData } from '../../models/deck-map';
import { DeckMapLayerService } from '../deck-map-layer.service';

@Injectable({
  providedIn: 'root',
})
export class PathLayerHandlerService implements DeckLayerHandler<Device> {

  constructor(private deckMapLayerService: DeckMapLayerService) {}

  createLayer(deckMapDataList: DeckMapData<Device>[]): any {
    return this.deckMapLayerService.createPathLayer(deckMapDataList);
  }

  shouldHandle(deckMapDataList: DeckMapData<Device>[]): boolean {
    return deckMapDataList.some(deckMapData => deckMapData.map.path?.length);
  }
}
