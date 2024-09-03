'use client';
import { parse } from './parse';

// Calculate and return totals

export function getTotals(players) {
    let totalBuyIn = 0;
    let totalCashOut = 0;
    players.forEach(player => {
        totalBuyIn += Number(player.buyIn);
        totalCashOut += Number(player.cashOut);
    });
    totalBuyIn = parse(totalBuyIn);
    totalCashOut = parse(totalCashOut);
    return { totalBuyIn, totalCashOut };
}
