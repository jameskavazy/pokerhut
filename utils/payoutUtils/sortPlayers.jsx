'use client';

export function sortPlayers(players) {
    for (const player of players) {
        player.profit = player.cashOut - player.buyIn;
    }

    return players.sort((a, b) => {
        return (b.profit - a.profit);
    });
}
