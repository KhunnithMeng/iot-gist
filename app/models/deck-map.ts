export interface DeckMapIcon<T> {
  id: string,
  svg: string, // ICON as svg image,
  position: [number, number] // longitude, latitude
  data: T
}

export interface DeckMapPath<T> {
  id: string,
  position: [number, number],
  path: [number, number][], // [longitude, latitude][]
  data: T
}

export interface DeckMapData<T> {
  map: {
    svg: string,
    id: string,
    position: [number, number],
    path: [number, number][],
  },
  info: {
    id: string,
    position: [number, number] // [longitude, latitude]
    name: string,
    type: 'bus' | 'vessel' | 'car',
    status: 'active' | 'offline' | 'idle',
    path: [number, number][],
    updatedAt: number
  }
}

