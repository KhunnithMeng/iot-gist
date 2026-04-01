import { Injectable } from '@angular/core';
import { DeckMapData } from '../models/deck-map-data';
import { PathLayer } from '@deck.gl/layers';
import { DeckMapService } from './deck-map.service';
import { DeckMapLayerService } from './deck-map-layer.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';
import { DeviceService } from './device.service';
import { DeckMapIcon } from '../models/deck-map';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deviceDisplayInfoStateService: DeviceInfoDisplayStateService,
              private deviceService: DeviceService,
              private deckMapLayerService: DeckMapLayerService) {
  }
  public clickDevice(data: DeckMapIcon<Device>) {
    this.toggleDeviceHistoryPath(data);
    this.displaySideBar(data);
  }

  private displaySideBar(data: DeckMapIcon<Device>) {
    this.deviceDisplayInfoStateService.displayInfo(data);
  }

  private toggleDeviceHistoryPath(data: DeckMapIcon<Device>) {
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
