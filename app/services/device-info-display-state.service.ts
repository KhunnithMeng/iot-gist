import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeckMapIcon } from '../models/deck-map';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoDisplayStateService {
  private displayInformationState: BehaviorSubject<DeckMapIcon<Device> | null> = new BehaviorSubject<DeckMapIcon<Device> | null>(null);
  displayDeviceInfoDetection$ = this.displayInformationState.asObservable();

  public displayInfo(data: DeckMapIcon<Device>) {
    this.displayInformationState.next(data);
  }

  public closeInfo() {
    this.displayInformationState.next(null);
  }

  public getLatestDevice() {
    return this.displayInformationState.getValue();
  }

}
