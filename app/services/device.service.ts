import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Device } from '../models/device.model';
import { GPSDevice, GPSPosition } from '../models/GPS-Position';
// @ts-ignore
import { HttpClient } from '@angular/common/http';
import { GPSHistory, GPSHistoryDevice } from '../models/GPS-History';
import { DeckMapPath } from '../models/deck-map';
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http: HttpClient = inject(HttpClient);
  constructor() {
  }

  public getDevices(): Observable<Device[]> {
    return this.http.get<GPSPosition>('http://172.30.30.62:6001/devices/positions')
      .pipe(map(this.transformGPSPositionToDevice.bind(this)))
  }

  public getHistory(deviceId: string) {
    return this.http.get<GPSHistory>('http://172.30.30.62:6001/devices/history?deviceId=' + deviceId)
      .pipe(map(this.transformGPSHistoryToDevice.bind(this)))
  }

  private transformGPSHistoryToDevice(gpsHistory: GPSHistory): DeckMapPath<Device> | null {
    if (!gpsHistory || !gpsHistory.device || gpsHistory.device.path.length === 0) return null;
    const device: GPSHistoryDevice = gpsHistory.device;
    return {
      id: device.id,
      position: device.position,
      path: device.path,
      data: { ...device, name: device.deviceName }
    } as DeckMapPath<Device>
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
