import { Injectable } from '@angular/core';
import { PathLayer } from '@deck.gl/layers';
import { DeckMapService } from './deck-map.service';
import { DeckMapLayerService } from './deck-map-layer.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';
import { DeviceService } from './device.service';
import { DeckMapIcon, DeckMapPath } from '../models/deck-map';
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
    const device = this.deviceDisplayInfoStateService.getLatestDevice();
    if (device?.id === data?.id) {
      this.deviceDisplayInfoStateService.closeInfo();
    } else {
      this.deviceDisplayInfoStateService.displayInfo(data)
    }
  }

  private toggleDeviceHistoryPath(data: DeckMapIcon<Device>) {
    const previousPathLayer: PathLayer = this.deckMapService.getLayer('path-layer');
    const previousSelectedData = previousPathLayer.props.data as DeckMapPath<Device>[];
    if (previousSelectedData?.length > 0 && previousSelectedData[0].id === data.id) {
      const pathLayer = this.deckMapLayerService.createPathLayer();
      this.deckMapService.updateLayer(pathLayer);
    } else {
      this.deviceService.getHistory(data.id).subscribe(data => {
        if (data) {
          const pathLayer = this.deckMapLayerService.createPathLayer([ data as DeckMapPath<Device> ]);
          this.deckMapService.updateLayer(pathLayer);
        } else {
          const pathLayer = this.deckMapLayerService.createPathLayer();
          this.deckMapService.updateLayer(pathLayer);
        }
      });
    }
  }

  public hoverDevice(data: DeckMapIcon<Device>) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
