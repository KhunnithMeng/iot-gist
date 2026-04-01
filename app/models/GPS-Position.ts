export interface GPSPosition {
  count: number;
  devices: GPSDevice[];
}

export interface GPSDevice {
  altitude: number;
  connectionStatus: 'offline' | 'online' | string;
  deviceId: string;
  deviceType: string;
  gpsDate: number;
  gpsTime: number;
  label: string;
  lat: number;
  lng: number;
  motionStatus: 'moving' | 'stopped' | string;
  speed: number;
  updatedAt: number;
}
