import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Device } from '../../../../models/device.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { DeviceInfoDisplayStateService } from '../../../../services/device-info-display-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-info-sidebar',
  imports: [
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './device-info-sidebar.html',
  styleUrl: './device-info-sidebar.scss',
  standalone: true
})
export class DeviceInfoSidebar implements OnInit, OnDestroy {

  selectedDevice: Device | null = null;

  subscription!: Subscription

  constructor(private deviceInfoDisplayStateService: DeviceInfoDisplayStateService, private cdr: ChangeDetectorRef) {
  }

  closeDevice() {
    this.deviceInfoDisplayStateService.closeInfo();
  }

  ngOnInit(): void {
    this.subscription = this.deviceInfoDisplayStateService
      .displayDeviceInfoDetection$.subscribe(res => {
        if (!res) {
          this.selectedDevice = null;
          this.cdr.detectChanges();
          return;
        }
        this.selectedDevice = { ...res.info };
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
