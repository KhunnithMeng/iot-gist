import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  public getDevices(): Observable<Device[]> {
    const minLat = 10;
    const maxLat = 14.7;
    const minLng = 102.3;
    const maxLng = 107.6;

    const randomData: Device[] = new Array(2000).fill({}).reduce((total, current) => {
      const randomLat: number = minLat + (maxLat - minLat) * Math.random();
      const randomLng: number = minLng + (maxLng - minLng) * Math.random();
      const types: string[] = ['bus', 'vessel', 'car'];
      total.push({
        position: [randomLng, randomLat],
        name: 'unknown',
        type: types[Math.floor(Math.random() * types.length)]
      });
      return total;
    }, []);

    return of(randomData)
  }
}
