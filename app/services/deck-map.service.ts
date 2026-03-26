import { Injectable } from '@angular/core';
import { IconLayer } from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';
import { MAP_ICONS } from '../src/app/pages/map/map-icons';
import { MapboxOverlay } from '@deck.gl/mapbox';

@Injectable({
  providedIn: 'root'
})
export class DeckMapService {
  private mapboxOverlay!: MapboxOverlay;
  private map!: maplibregl.Map;
  private viewData: { [key: string]: any }[] = [];

  /**
   * Required to initial map by given HTML Div Container accessed from HTML DOM Reference
   * @param mapContainer
   */
  public init(mapContainer: HTMLDivElement) {
    // Initialize map libre GL
    this.map = new maplibregl.Map({
      container: mapContainer,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [104.9282, 11.5564], // [lng, lat]
      zoom: 7
    });

    this.map.on('load', () => {
      this.initializeDeckOverlay()
    })
  }

  /**
   * Update map marker icon data by given data as a array object
   * @param data
   */
  public updateData(data: { [key: string]: any }[]) {
    this.viewData = data;
    if (this.mapboxOverlay) {
      this.mapboxOverlay.setProps({
        layers: this.buildLayers()
      })
    }
  }

  private initializeDeckOverlay() {
    this.mapboxOverlay = new MapboxOverlay({
      interleaved: false,
      layers: this.buildLayers()
    });

    this.map.addControl(this.mapboxOverlay);
  }

  private buildLayers() {
    return [
      new IconLayer({
        id: 'devices',
        data: this.viewData,

        getIcon: (d) => ({
          url: MAP_ICONS[d.type],
          width: 20,
          height: 20,
          anchorY: 20
        }),

        getPosition: (d) => d.position,
        getSize: 20,
        pickable: true,

        onClick: ({ object }) => {
          console.log("HELLO GIRL ", object);
        },
        onHover: ({ object }) => {
          this.map.getCanvas().style.cursor = object ? 'pointer' : 'default';
        }
      })
    ]
  }

  close() {
    this.map?.removeControl(this.mapboxOverlay);
    this.map?.remove();
  }
}
