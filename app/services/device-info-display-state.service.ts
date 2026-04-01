import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DeckMapData } from '../models/deck-map-data';

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoDisplayStateService {
  private displayInformationState: Subject<DeckMapData | null> = new Subject<DeckMapData | null>();
  displayDeviceInfoDetection$ = this.displayInformationState.asObservable();

  public displayInfo(data: DeckMapData) {
    this.displayInformationState.next(data);
  }

  public closeInfo() {
    this.displayInformationState.next(null);
  }

}
