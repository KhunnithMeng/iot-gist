import { Injectable } from '@angular/core';
import { DeckMapService } from './deck-map.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';
import { DeckMapIcon } from '../models/deck-map';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deviceDisplayInfoStateService: DeviceInfoDisplayStateService) {
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
    console.log('display history path');
  }

  private hideDeviceHistoryPath() {
    console.log('hide device history path');
  }

  public hoverDevice(data: DeckMapIcon<Device>) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
