import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { DeckMapData } from '../../../../models/deck-map-data';
import { Device } from '../../../../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceMapService {

  constructor(private deckMapService: DeckMapService,
              private deckMapLayerService: DeckMapLayerService) {}

  public initializeMap(mapContainer: HTMLDivElement) {
    this.deckMapService.init(mapContainer);
    this.initializeMapLayer();
  }

  private initializeMapLayer() {
    const iconLayer = this.deckMapLayerService.createIconLayer();
    const pathLayer = this.deckMapLayerService.createPathLayer();

    this.deckMapService.addLayer(iconLayer);
    this.deckMapService.addLayer(pathLayer);
  }

  public updateDevice(devices: Device[]) {
    if (!devices) return;
    const data: DeckMapData[] = devices?.map(this.transformDeviceToDeckMapData.bind(this));
    const iconLayer = this.deckMapLayerService.createIconLayer(data);
    this.deckMapService.addLayer(iconLayer);
  }

  private transformDeviceToDeckMapData(device: Device) {
    return {
      id: device.id,
      position: device.position,
      name: device.name,
      type: device.type,
      path: device.path,
    }
  }

  public clear() {
    this.deckMapService.close();
  }

}
