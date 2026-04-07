import { Injectable } from '@angular/core';
import { IconLayer, PathLayer } from '@deck.gl/layers';
import { Observable, Subject } from 'rxjs';
import { DeckMapData, DeckMapIcon, DeckMapPath } from '../models/deck-map';
import { LayerDataSource } from '@deck.gl/core';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeckMapLayerService {

  private iconClick: Subject<DeckMapIcon<Device>> = new Subject<DeckMapIcon<Device>>();
  public clickIcon$: Observable<DeckMapIcon<Device>> = this.iconClick.asObservable();

  private iconHover: Subject<DeckMapIcon<Device>> = new Subject<DeckMapIcon<Device>>();
  public hoverIcon$: Observable<DeckMapIcon<Device>> = this.iconHover.asObservable();

  /**
   * Create icon layer with configuration for handling markers
   */
    public createIconLayer<T>(deckMapDataList?: DeckMapData<T>[]): IconLayer {
      return new IconLayer({
        id: 'icon-layer',
        data: (deckMapDataList || []) as LayerDataSource<DeckMapIcon<T>>,

        getIcon: (d: DeckMapData<T>) => ({
          url: d.map.svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(d.map.svg)}` : '',
          width: 64,
          height: 64,
          anchorY: 32
        }),

        getPosition: (d: DeckMapData<T>) => d.map.position || [],
        getSize: 20,
        pickable: true,

        onClick: ({ object }) => this.iconClick.next(object),
        onHover: ({ object }) => this.iconHover.next(object)
      })
    }

  /**
   * Create path layer with configuration for handling track line
   */
  public createPathLayer(data?: DeckMapData<Device>[]): PathLayer {
    return new PathLayer({
      id: 'path-layer',
      data: data || [],
      getPath: (d: DeckMapPath<Device>) => d.path,
      getColor: [255, 50, 50, 200],
      getWidth: 20,
      widthMinPixels: 2,
      capRounded: true,
      jointRounded: true
    })
  }

}
