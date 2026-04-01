export interface Device {
  id: string,
  position: [number, number] // [longitude, latitude]
  name: string,
  type: 'bus' | 'vessel' | 'car',
  status: 'active' | 'offline' | 'idle',
  path: [number, number][],
  updatedAt: number
}
