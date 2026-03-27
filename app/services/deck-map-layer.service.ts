import { Injectable } from '@angular/core';
import { IconLayer, PathLayer } from '@deck.gl/layers';
import { MAP_ICONS } from '../src/app/pages/map/map-icons';
import { DeckMapData } from '../models/deck-map-data';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckMapLayerService {

  private iconClick: Subject<DeckMapData> = new Subject<DeckMapData>();
  public clickIcon$: Observable<DeckMapData> = this.iconClick.asObservable();

  private iconHover: Subject<DeckMapData> = new Subject<DeckMapData>();
  public hoverIcon$: Observable<DeckMapData> = this.iconHover.asObservable();

  /**
   * Create icon layer with configuration for handling markers
   */
  public createIconLayer(data?: DeckMapData[]): IconLayer {
    return new IconLayer({
      id: 'icon-layer',
      data: data || [],

      getIcon: (d) => ({
        url: MAP_ICONS[d.type],
        width: 64,
        height: 64,
        anchorY: 32
      }),

      getPosition: (d: DeckMapData) => d.position,
      getSize: 20,
      pickable: true,

      onClick: ({ object }) => this.iconClick.next(object),
      onHover: ({ object }) => this.iconHover.next(object)
    })
  }

  /**
   * Create path layer with configuration for handling track line
   */
  public createPathLayer(data?: DeckMapData[]): PathLayer {
    return new PathLayer({
      id: 'path-layer',
      data: data || [],
      getPath: (d: DeckMapData) => d.path,
      getColor: [255, 50, 50, 200],
      getWidth: 20,
      widthMinPixels: 2,
      capRounded: true,
      jointRounded: true
    })
  }

}
