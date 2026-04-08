import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeckMapData } from '../models/deck-map';

@Injectable({
  providedIn: 'root',
})
export class DeckLayerStateService<T> {
  private pathLine: BehaviorSubject<DeckMapData<T> | null> = new BehaviorSubject<DeckMapData<T> | null>(null);

  displayPathLine(deckMapData: DeckMapData<T>) {
    this.pathLine.next(deckMapData);
  }

  hidePathLine() {
    this.pathLine.next(null);
  }

  getPathLine() {
    return this.pathLine.getValue();
  }
}
