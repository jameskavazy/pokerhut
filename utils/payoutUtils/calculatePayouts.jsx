'use client';

import { determineOutcomes } from './determineOutcomes';
import { sortPlayers } from './sortPlayers';

import { toDeque } from "./toDeque";


export function calculatePayouts(players) {
    players = sortPlayers(players);
    const playersDeque = toDeque(players);
    determineOutcomes(playersDeque);
}
