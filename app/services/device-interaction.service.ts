import { Injectable } from '@angular/core';
import { DeckMapService } from './deck-map.service';
import { DeviceInfoDisplayStateService } from './device-info-display-state.service';
import { DeckMapData } from '../models/deck-map';
import { Device } from '../models/device.model';
import { DeckLayerStateService } from './deck-layer-state.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceInteractionService {

  constructor(private deckMapService: DeckMapService,
              private deckLayerStateService: DeckLayerStateService<Device>,
              private deviceDisplayInfoStateService: DeviceInfoDisplayStateService) {
  }
  public clickDevice(data: DeckMapData<Device>) {
    this.displaySideBar(data);
  }

  private displaySideBar(data: DeckMapData<Device>) {
    const device = this.deviceDisplayInfoStateService.getLatestDevice();
    if (device?.map.id === data?.map.id) {
      this.deviceDisplayInfoStateService.closeInfo();
      this.hideDeviceHistoryPath()
    } else {
      this.deviceDisplayInfoStateService.displayInfo(data)
      this.displayHistoryPath(data);
    }
  }

  private displayHistoryPath(deckMapData: DeckMapData<Device>) {
    this.deckLayerStateService.displayPathLine(deckMapData)
  }

  private hideDeviceHistoryPath() {
    this.deckLayerStateService.hidePathLine();
  }

  public hoverDevice(data: DeckMapData<Device>) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
  }
}
