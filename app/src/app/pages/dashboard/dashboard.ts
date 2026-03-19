import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MapService } from '../../../../services/map-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard implements AfterViewInit, OnDestroy {

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initMap('map');

    // Example data (replace with API later)
    const mockData = this.generateMockData(2000);
    this.mapService.renderMarkers(mockData);
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  private generateMockData(count: number) {
    return Array.from({ length: count }).map(() => ({
      lat: 11 + Math.random(),
      lng: 104 + Math.random(),
      type: 'vessel'
    }));
  }
}
