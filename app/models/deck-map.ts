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

