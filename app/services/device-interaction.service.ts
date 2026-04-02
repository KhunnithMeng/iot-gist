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
    this.displaySideBar(data);
  }

  private displaySideBar(data: DeckMapIcon<Device>) {
    const device = this.deviceDisplayInfoStateService.getLatestDevice();
    if (device?.id === data?.id) {
      this.deviceDisplayInfoStateService.closeInfo();
      this.hideDeviceHistoryPath()
    } else {
      this.deviceDisplayInfoStateService.displayInfo(data)
      this.displayHistoryPath();
    }
  }

  private displayHistoryPath() {
    const device = this.deviceDisplayInfoStateService.getLatestDevice();
    if (device) {
      this.deviceService.getHistory(device.id).subscribe(res => {
        const pathLayer = this.deckMapLayerService.createPathLayer([res as DeckMapPath<any>]);
        this.deckMapService.updateLayer(pathLayer);
      });
    }
  }

  private hideDeviceHistoryPath() {
    const device = this.deviceDisplayInfoStateService.getLatestDevice();
    if (!device) {
      const pathLayer = this.deckMapLayerService.createPathLayer();
      this.deckMapService.updateLayer(pathLayer);
    }
  }

  public hoverDevice(data: DeckMapIcon<Device>) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
