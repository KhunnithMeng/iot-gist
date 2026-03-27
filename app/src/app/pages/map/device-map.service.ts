import { Injectable } from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapLayerService } from '../../../../services/deck-map-layer.service';
import { DeckMapData } from '../../../../models/deck-map-data';
import { Device } from '../../../../models/device.model';
import { PathLayer } from '@deck.gl/layers';

@Injectable({
  providedIn: 'root',
})
export class DeviceMapService {

  constructor(private deckMapService: DeckMapService,
              private deckMapLayerService: DeckMapLayerService) {}

  public initializeMap(mapContainer: HTMLDivElement) {
    this.deckMapService.init(mapContainer);
    this.initializeMapLayer();
    this.handlingMapEvent();
  }

  private handlingMapEvent() {
    this.deckMapLayerService.clickIcon$.subscribe(this.handleClickOnIcon.bind(this));
    this.deckMapLayerService.hoverIcon$.subscribe(this.handleHoverCursorOnIcon.bind(this));
  }

  private handleClickOnIcon(data: DeckMapData) {
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

  private handleHoverCursorOnIcon(data: DeckMapData) {
    const map = this.deckMapService.getMap();
    map.getCanvas().style.cursor = data ? 'pointer' : 'default';
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
    this.deckMapService.updateLayer(iconLayer);
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
