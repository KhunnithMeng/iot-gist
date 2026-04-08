import { Injectable } from '@angular/core';
import { DeviceSocketService } from './device-socket-service';
import { map, switchMap, lastValueFrom } from 'rxjs';
import { DeckLayerStateService } from './deck-layer-state.service';
import { DeckMapData } from '../models/deck-map';
import { Device } from '../models/device.model';
import { DataResponse } from '../models/data-response';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceAdapterService {
  constructor(private deviceSocketService: DeviceSocketService,
              private deviceService: DeviceService,
              private deckLayerStateService: DeckLayerStateService<Device>) {
  }

  getDevices() {
    return this.deviceSocketService.listen()
      .pipe(switchMap(this.transformDataBasedOnLayerState.bind(this)));
  }

  private async transformDataBasedOnLayerState(dataResponse: DataResponse< DeckMapData<Device>[]>) {
    let deckMapDataList = dataResponse.data;
    const pathLine = this.deckLayerStateService.getPathLine();
    if (pathLine) {
      deckMapDataList = await this.bindPathWithDevice(deckMapDataList);
    }
    return deckMapDataList;
  }

  private async bindPathWithDevice(deckMapDataList: DeckMapData<Device>[]) {
    const pathLine = this.deckLayerStateService.getPathLine();
    const fetchDeviceHistory$ = this.deviceService.getHistory(pathLine?.map.id || '')
      .pipe(map(res => res.data.path))
    const path = await lastValueFrom(fetchDeviceHistory$);
    return deckMapDataList.map(deckMapData => {
      if (deckMapData.map.id === pathLine?.map.id) {
        deckMapData.map.path = path
      }
      return deckMapData;
    })
  }
}
