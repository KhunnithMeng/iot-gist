import { InjectionToken } from '@angular/core';
import { DeckLayerHandler } from '../models/deck-layer-handler';

export const DECK_LAYER_HANDLERS = new InjectionToken<DeckLayerHandler<any>[]>('DECK_LAYER_HANDLERS')
