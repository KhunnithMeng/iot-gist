import { Injectable } from '@angular/core';
import { DeckMapData } from '../models/deck-map-data';
import { PathLayer } from '@deck.gl/layers';
import { DeckMapService } from './deck-map.service';
import { DeckMapLayerService } from './deck-map-layer.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deckMapLayerService: DeckMapLayerService) {
  }
  public clickDevice(data: DeckMapData) {
    const previousPathLayer: PathLayer = this.deckMapService.getLayer('path-layer');
    const previousSelectedData = previousPathLayer.props.data as DeckMapData[];
    let pathLayer: PathLayer;
    if (previousSelectedData?.length > 0 && previousSelectedData[0].id === data.id) {
      pathLayer = this.deckMapLayerService.createPathLayer();
    } else {
      pathLayer = this.deckMapLayerService.createPathLayer([ data ]);
    }
    this.deckMapService.updateLayer(pathLayer);
  }

  public hoverDevice(data: DeckMapData) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
