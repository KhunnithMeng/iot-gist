import { Injectable } from '@angular/core';
import { DeckLayerHandler } from '../../models/deck-layer-handler';
import { DeckMapData } from '../../models/deck-map';
import { Device } from '../../models/device.model';
import { DeckMapLayerService } from '../deck-map-layer.service';

@Injectable({
  providedIn: 'root',
})
export class IconLayerHandlerService implements DeckLayerHandler<Device> {

  constructor(private deckMapLayerService: DeckMapLayerService) {}

  createLayer(deckMapDataList: DeckMapData<Device>[]): any {
    return this.deckMapLayerService.createIconLayer(deckMapDataList)
  }

  shouldHandle(deckMapDataList: DeckMapData<Device>[]): boolean {
    return deckMapDataList.some(deckMapData => deckMapData.map.svg?.length);
  }
}
