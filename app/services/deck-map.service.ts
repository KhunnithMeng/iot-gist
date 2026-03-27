import { Injectable } from '@angular/core';
import { IconLayer, PathLayer } from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';
import { MAP_ICONS } from '../src/app/pages/map/map-icons';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { DeckMapData } from '../models/deck-map-data';

@Injectable({
  providedIn: 'root'
})
export class DeckMapService {
  private mapboxOverlay!: MapboxOverlay;
  private map!: maplibregl.Map;
  private markers: DeckMapData[] = [];

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
  public updateData(data: DeckMapData[]) {
    this.markers = data;
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
        data: this.markers,

        getIcon: (d) => ({
          url: MAP_ICONS[d.type],
          width: 64,
          height: 64,
          anchorY: 32
        }),

        getPosition: (d: DeckMapData) => d.position,
        getSize: 20,
        pickable: true,

        onClick: ({ object }) => {
          console.log("HELLO GIRL ", object);
        },
        onHover: ({ object }) => {
          this.map.getCanvas().style.cursor = object ? 'pointer' : 'default';
        }
      }),
      new PathLayer({
        id: 'device-path',
        data: this.markers,
        getPath: (d: DeckMapData) => d.path,
        getColor: [255, 50, 50, 200],
        getWidth: 20,
        widthMinPixels: 2,
        capRounded: true,
        jointRounded: true
      })
    ]
  }

  close() {
    this.map?.removeControl(this.mapboxOverlay);
    this.map?.remove();
  }
}
