import { DeckMapData } from './deck-map';

export interface DeckLayerHandler<T> {
  /**
   * Check if the deck map data have the data that require to handle the layer or not
   * @param deckMapDataList
   */
  shouldHandle(deckMapDataList: DeckMapData<T>[]): boolean;

  /**
   * Create layer if it required to handle based on given deck map data.
   * It mandatory to check the existence of the layer if it now throw error
   * @param deckMapDataList
   */
  createLayer(deckMapDataList: DeckMapData<T>[]): any;
}
