export interface DeckMapData {
  id: string,
  position: [number, number] // [longitude, latitude]
  name: string,
  type: 'bus' | 'vessel' | 'car',
  path: [number, number][]
}
