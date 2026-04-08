import { inject, Injectable } from '@angular/core';
// @ts-ignore
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/data-response';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  public getHistory(deviceId: string) {
    return this.http.get<DataResponse<any>>('http://172.30.30.62:6001/devices/history?deviceId=' + deviceId)
  }
}
