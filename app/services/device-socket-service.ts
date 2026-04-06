import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { DeckMapData } from '../models/deck-map';
import { Device } from '../models/device.model';
import { DataResponse } from '../models/data-response';

@Injectable({
  providedIn: 'root',
})
export class DeviceSocketService {
  private socket

  constructor() {
    this.socket = io('http://172.30.30.62:6001', {
      query: { connectionStatus: 'online' }
    });
  }

  listen(): Observable<DataResponse<DeckMapData<Device>[]>> {
    // @ts-ignore
    this.socket.on('connect', (socket) => {
      console.log('Successfully connected ', socket || '');
    })

    return new Observable(subscriber => {
      this.socket.on('device_positions', (data) => {
        subscriber.next(data);
      })
    });
  }

  disconnect() {
    this.socket.on('disconnect', (reason) => {
      console.log(reason);
    })
  }

}
