import { Injectable } from '@angular/core';
import { DeckMapData } from '../models/deck-map-data';
import { PathLayer } from '@deck.gl/layers';
import { DeckMapService } from './deck-map.service';
import { DeckMapLayerService } from './deck-map-layer.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deviceDisplayInfoStateService: DeviceInfoDisplayStateService,
              private deviceService: DeviceService,
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
    if (previousSelectedData?.length > 0 && previousSelectedData[0].id === data.id) {
      const pathLayer = this.deckMapLayerService.createPathLayer();
      this.deckMapService.updateLayer(pathLayer);
    } else {
      this.deviceService.getHistory(data.id).subscribe(data => {
        if (data) {
          const pathLayer = this.deckMapLayerService.createPathLayer([ data as DeckMapData ]);
          this.deckMapService.updateLayer(pathLayer);
        } else {
          const pathLayer = this.deckMapLayerService.createPathLayer();
          this.deckMapService.updateLayer(pathLayer);
        }
      });
    }
  }

  public hoverDevice(data: DeckMapData) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
