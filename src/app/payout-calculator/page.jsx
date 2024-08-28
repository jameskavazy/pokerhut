'use client';
import { useEffect, useState } from 'react';
import { PlayerForm } from "./PlayerForm";
import { Results } from "./Results";
import { InvalidValueWarning } from "./InvalidValueWarning";
import { v4 as uuidv4 } from 'uuid';
import './payout.css';

export default function Payout() {
    // State for players
    const [players, setPlayers] = useState(() => [{ id: uuidv4(), name: '', buyIn: '', cashOut: '' }]);
    // State for results and values
    const [results, setResults] = useState(false);
    const [values, setValues] = useState({ buyIn: '', cashOut: '' });
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
            { id: uuidv4(), name: '', buyIn: '', cashOut: '' }
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
    }

    // Reset values and results
    function onBackPressed() {
        console.log('onBackPressed Called');
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
        return null; // or a loading spinner
    }

    return (
        <div>
            {results ? (
                values.buyIn === values.cashOut ? (
                    <Results players={players} onBackPressed={onBackPressed} />
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
    return { totalBuyIn, totalCashOut };
}


export function calculatePayouts(){

    //So we need to find a place for 

}