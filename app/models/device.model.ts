export interface Device {
  position: [number, number] // [longitude, latitude]
  name: string,
  type: 'bus' | 'vessel' | 'car'
}
