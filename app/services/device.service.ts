import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Device } from '../models/device.model';
import { HttpClient } from '@angular/common/http';
import { GPSDevice, GPSPosition } from '../models/GPS-Position';
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);
  constructor() {
  }

  public getDevices(): Observable<Device[]> {
    return this.http.get<GPSPosition>('http://172.30.30.62:6001/devices/positions')
      .pipe(map(this.transformGPSPositionToDevice.bind(this)))
  }

  private transformGPSPositionToDevice(gpsPosition: GPSPosition): Device[] {
    if (!gpsPosition || gpsPosition.devices.length === 0) return [];
    return gpsPosition.devices.map((device: GPSDevice) => ({
      id: device.deviceId,
      position: [device.lng, device.lat],
      name: device.label,
      type: device.deviceType,
      status: device.connectionStatus,
      path: [],
      updatedAt: device.updatedAt
    })) as Device[]
  }
}
