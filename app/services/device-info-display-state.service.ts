import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeckMapData } from '../models/deck-map';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoDisplayStateService {
  private displayInformationState: BehaviorSubject<DeckMapData<Device> | null> = new BehaviorSubject<DeckMapData<Device> | null>(null);
  displayDeviceInfoDetection$ = this.displayInformationState.asObservable();

  public displayInfo(data: DeckMapData<Device>) {
    this.displayInformationState.next(data);
  }

  public closeInfo() {
    this.displayInformationState.next(null);
  }

  public getLatestDevice() {
    return this.displayInformationState.getValue();
  }

}
