'use client';

export function playerFormIsValid(players) {
    for (const player of players) {
        if (player.name === '' || player.buyIn === '' || player.cashOut === '') return false;
        if (Number(player.cashOut) < 0 || Number(player.buyIn) < 0) return false;
        
    }
    return true;
}
