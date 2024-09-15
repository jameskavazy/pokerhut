'use client';
import { useEffect, useState } from 'react';
import PlayerForm from './PlayerForm';
import Results from './Results';
import InvalidValueWarning from './InvalidValueWarning';
import { v4 as uuidv4 } from 'uuid';
import './payout.css';
import { playerFormIsValid } from '../../../../utils/payoutUtils/playerFormIsValid';
import { getTotals } from '../../../../utils/payoutUtils/getTotals';
import { calculatePayouts } from '../../../../utils/payoutUtils/calculatePayouts';

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
        const validResults = playerFormIsValid(players);
        setResults(validResults);
        if (validResults) {
            const { totalBuyIn, totalCashOut } = getTotals(players);
            setValues({ buyIn: totalBuyIn, cashOut: totalCashOut });
            if (totalBuyIn === 0 || totalCashOut === 0) return; 
            calculatePayouts(players);          
            console.log(payments);
        }    
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

    for (const player of players){
        console.log(`${player.name}The players are ${player.id}`);
    }
    return (
        <div>
            {results ? (
                values.buyIn === values.cashOut ? 
                (<Results players={players} onBackPressed={onBackPressed} testPaymentDetails={payments} />) 
                    : 
                (<InvalidValueWarning totalCashOut={values.cashOut} totalBuyIn={values.buyIn} onBackPressed={onBackPressed}/>)
            ) 
                : (
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