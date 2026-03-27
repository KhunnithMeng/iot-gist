import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  public getDevices(): Observable<Device[]> {
    const randomData: Device[] = [
      {
        id: 'car-kh-888',
        name: 'Norodom Express',
        type: 'car',
        position: [104.9295, 11.5480], // Current: Near the Russian Embassy area
        path: [
          [104.9243, 11.5758], // Start: Near Wat Phnom / Post Office
          [104.9242, 11.5720], // Passing Raffles Le Royal
          [104.9241, 11.5680], // Intersection with Street 130
          [104.9241, 11.5640], // Near Central Market (East side)
          [104.9265, 11.5600], // Approaching Sihanouk Blvd
          [104.9282, 11.5564], // Independence Monument Roundabout
          [104.9295, 11.5480]  // Current: Heading South toward Mao Tse Toung Blvd
        ]
      },
      {
        id: 'device-2',
        position: [103.8198, 1.3521],
        name: 'Singapore Taxi',
        type: 'car',
        path: [
          [103.780, 1.290],
          [103.795, 1.310],
          [103.808, 1.330],
          [103.820, 1.352],
        ]
      },
      {
        id: 'device-3',
        position: [100.5018, 13.7563],
        name: 'Bangkok Express',
        type: 'bus',
        path: [
          [100.440, 13.700],
          [100.460, 13.720],
          [100.480, 13.740],
          [100.502, 13.756],
        ]
      },
    ];

    return of(randomData)
  }
}
