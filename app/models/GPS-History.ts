import { GPSDevice } from './GPS-Position';

export interface GPSHistory {
  count: number;
  device: GPSHistoryDevice;
  deviceId: string;
  endedAt: number;
  refreshedAt: number;
  startedAt: number;
}

export interface GPSHistoryDevice {
  deviceId: string;
  deviceName: string;
  id: string;
  path: [number, number][] | any[];
  position: [number, number];
  status: 'active' | 'offline' | 'idle';
  type: 'bus' | 'vessel' | 'car';
  updatedAt: number;
}
