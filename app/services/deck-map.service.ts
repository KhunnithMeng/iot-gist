import { Injectable } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

@Injectable({
  providedIn: 'root'
})
export class DeckMapService {
  private mapboxOverlay!: MapboxOverlay;
  private map!: maplibregl.Map;

  private layers: Map<string, any> = new Map<string, any>();

  /**
   * Required to initial map by given HTML Div Container accessed from HTML DOM Reference
   * @param mapContainer
   */
  public init(mapContainer: HTMLDivElement) {
    // Initialize map libre GL
    this.map = new maplibregl.Map({
      container: mapContainer,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [ 104.9282, 11.5564 ], // [lng, lat]
      zoom: 7
    });

    this.mapboxOverlay = new MapboxOverlay({
      interleaved: false,
      layers: []
    });

    this.map.addControl(this.mapboxOverlay);
  }

  public getMap() {
    return this.map;
  }

  public getLayer(layerId: string) {
    return this.layers.get(layerId);
  }

  public addLayer(layer: any) {
    this.layers.set(layer.id, layer);
    this.render();
  }

  public updateLayer(layer: any) {
    this.layers.set(layer.id, layer);
    this.render();
  }

  public removeLayer(layerId: string) {
    this.layers.delete(layerId);
    this.render();
  }

  private render() {
    this.mapboxOverlay.setProps({
      interleaved: false,
      layers: [ ...this.layers.values() ]
    })
  }

  close() {
    this.layers.clear();
    this.map?.removeControl(this.mapboxOverlay);
    this.map?.remove();
  }
}
