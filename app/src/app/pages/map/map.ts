import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DeckMapService } from '../../../../services/deck-map.service';
import { DeckMapData } from '../../../../models/deck-map-data';

@Component({
  selector: 'app-map',
  imports: [],
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges,OnDestroy {
  @ViewChild('mapContainerRef', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>;

  @Input() data: DeckMapData[] = []

  constructor(private mapService: DeckMapService) {
  }

  ngAfterViewInit(): void {
    this.mapService.init(this.mapContainerRef.nativeElement);
  }

  ngOnChanges(): void {
    this.mapService.updateData(this.data)
  }

  ngOnDestroy() {
    this.mapService.close();
  }
}
