import { Injectable } from '@angular/core';
import { DeckMapData } from '../models/deck-map-data';
import { PathLayer } from '@deck.gl/layers';
import { DeckMapService } from './deck-map.service';
import { DeckMapLayerService } from './deck-map-layer.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deviceDisplayInfoStateService: DeviceInfoDisplayStateService,
              private deckMapLayerService: DeckMapLayerService) {
  }
  public clickDevice(data: DeckMapData) {
    this.toggleDeviceHistoryPath(data);
    this.displaySideBar(data);
  }

  private displaySideBar(data: DeckMapData) {
    this.deviceDisplayInfoStateService.displayInfo(data);
  }

  private toggleDeviceHistoryPath(data: DeckMapData) {
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
