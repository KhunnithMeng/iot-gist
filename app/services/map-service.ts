import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { CanvasLayerService } from './canvas-layer';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.Map;

  constructor(private canvasLayer: CanvasLayerService) {}

  initMap(containerId: string) {
    this.map = L.map(containerId, {
      zoomControl: true,
      preferCanvas: true // 🔥 important
    }).setView([11.5564, 104.9282], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.canvasLayer.init(this.map);
  }

  renderMarkers(data: any[]) {
    this.canvasLayer.setData(data);
    this.canvasLayer.render();
  }

  destroyMap() {
    this.map.remove();
  }
}
