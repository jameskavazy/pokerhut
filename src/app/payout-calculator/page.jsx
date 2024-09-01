'use client';
import { useEffect, useState } from 'react';
import { PlayerForm } from "./PlayerForm";
import { Results } from "./Results";
import { InvalidValueWarning } from "./InvalidValueWarning";
import { v4 as uuidv4 } from 'uuid';
import './payout.css';
import Deque from '../Deque';

export var payments = [];

export default function Payout() {
    // State for players
    const [players, setPlayers] = useState(() => [{ id: uuidv4(), name: '', buyIn: 0, cashOut: 0 }]);
    // State for results and values
    const [results, setResults] = useState(false);
    const [values, setValues] = useState({ buyIn: 0, cashOut: 0 });
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Client-side only logic
        if (typeof window !== 'undefined') {
            const savedPlayers = localStorage.getItem("NAMES");
            if (savedPlayers) {
                try {
                    setPlayers(JSON.parse(savedPlayers));
                } catch (error) {
                    console.error('Error parsing localStorage data:', error);
                }
            }
            setIsHydrated(true); // Set hydrated state after client-side effects
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever players state changes
        if (isHydrated) {
            localStorage.setItem("NAMES", JSON.stringify(players));
        }
    }, [players, isHydrated]);

    // Add a new player
    function onAddPlayerBtnClick() {
        setPlayers(prevPlayers => [
            ...prevPlayers,
            { id: uuidv4(), name: '', buyIn: 0, cashOut: 0 }
        ]);
    }

    // Handle input changes for a player
    function handleInputChange(id, field, value) {
        setPlayers(currentPlayers =>
            currentPlayers.map(player =>
                player.id === id ? { ...player, [field]: value } : player
            )
        );
    }

    // Submit the form and validate
    function submitForm() {
        console.log('submitForm reached');
        setResults(playerFormIsValid(players));
        const { totalBuyIn, totalCashOut } = getTotals(players);
        setValues({ buyIn: totalBuyIn, cashOut: totalCashOut });
        calculatePayouts(players);          
        console.log(payments);
    }

    // Reset values and results
    function onBackPressed() {
        console.log('onBackPressed Called');
        payments = [];
        setValues({ buyIn: '', cashOut: '' });
        setResults(false);
    }

    // Remove a player by ID
    function onRemovePlayerBtnClick(id) {
        setPlayers(currentPlayers =>
            currentPlayers.filter(player => player.id !== id)
        );
    }

    // Prevent render until only after hydration
    if (!isHydrated) {
        return null; // Potential Need Loading Screen Here?
    }

    return (
        
        <div>
            {results ? (
                values.buyIn === values.cashOut ? (
                    <Results players={players} onBackPressed={onBackPressed} testPaymentDetails={payments} />
                ) : (
                    <InvalidValueWarning
                        totalCashOut={values.cashOut}
                        totalBuyIn={values.buyIn}
                        onBackPressed={onBackPressed}
                    />
                )
            ) : (
                <PlayerForm
                    data-testid="player-form-item"
                    submitForm={submitForm}
                    players={players}
                    handleInputChange={handleInputChange}
                    onAddPlayerBtnClick={onAddPlayerBtnClick}
                    onRemovePlayerBtnClick={onRemovePlayerBtnClick}
                />
            )}
        </div>
    );
}

// Validate player form
export function playerFormIsValid(players) {
    for (const player of players) {
        if (player.name === '' || player.buyIn === '' || player.cashOut === '') return false;
        if (Number(player.cashOut) < 0 || Number(player.buyIn) < 0) return false;
    }
    return true;
}

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


export function calculatePayouts(players){
    players = sortPlayers(players);
    const playersDeque = toDeque(players);
    determineOutcomes(playersDeque);
}

export function sortPlayers(players){
    for (const player of players){
        player.profit = player.cashOut - player.buyIn;
    }

    return players.sort((a, b) => {
        return (b.profit - a.profit)
    });
}

export function toDeque(playersArr){
    const playersDeque = new Deque();
    playersArr.forEach((e) => playersDeque.addRear(e));
    return playersDeque;
}

export function determineOutcomes(playersDeque){

    if (playersDeque.isEmpty()) return;

    if (parse(playersDeque.getRear().profit) < parse(playersDeque.getFront().profit)) {
        //POP last,  last pays off whole debt to front. 
        const last = playersDeque.removeRear();
        
        // Update Front's profit
        const front = playersDeque.getFront();
        front.profit -= parse(last.profit);

        //record transaction
        payments.push(`${last.name} owes £${parse(last.profit)} to ${front.name}`);
            
    } else if (parse(playersDeque.getRear().profit) > parse(playersDeque.getFront().profit)) {
        //Pop First is paid off completely,
        const first = playersDeque.removeFront();
        // update last
        const last = playersDeque.getRear();
        last.profit += parse(first.profit);
        payments.push(`${last.name} owes £${parse(first.profit)} to ${first.name}`);

    } else {
        //equal 
        // pop both, now zero.
        const first = playersDeque.removeFront();
        const last = playersDeque.removeRear();

        // payments.push(`${first.name} receives £${last.profit} from ${last.name}`);
        payments.push(`${last.name} owes £${parse(last.profit)} to ${first.name}`);

    }

    determineOutcomes(playersDeque);
}

/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @returns 
 */
export function lessThanOrEqual(a, b){
    return Math.abs(a) <= Math.abs(b);
}


export function parse(number){
    return Number(Math.abs(number).toFixed(2));
}

export function updatePayments(string){
    payments.push(string);
}
