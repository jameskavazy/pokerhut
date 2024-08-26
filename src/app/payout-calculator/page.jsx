'use client'
import { useState } from 'react'
import { PlayerForm } from "./PlayerForm"
import { Results } from "./Results"
import { InvalidValueWarning } from "./InvalidValueWarning"

import './payout.css'

export default function Payout(){
    const id = crypto.randomUUID();
    const [players, setPlayers] = useState([
        { id: id, name: '', buyIn: '', cashOut: ''}]
    );

    const [results, setResults] = useState(false);
    const [values, setValues] = useState({buyIn: '', cashOut: ''})

    function onAddPlayerBtnClick(){

        setPlayers((previousRow) => {
            const newId = crypto.randomUUID();
            return [
                ...previousRow,
                { id: newId, name: '', buyIn: '', cashOut: ''}
            ]
        });
    }

    function handleInputChange(id, field, value){
        /*
            Updates the current row if Id of the row that change is the same as the row in current rows,
             and then it updates the value using the spread operator to copy existing row

            then it updates the specific field (square brackets helps this work dynamically) with the new value
        */

        setPlayers((currentPlayers) => 
            currentPlayers.map(player => 
                player.id === id ? {...player, [field]: value } : player
        ));
    }

    function submitForm() {
        console.log('submitForm reached');
    
        var totalBuyIn = 0;
        var totalCashOut = 0;
    
        for (const player of players){
            if (player.name === '' || player.buyIn === '' || player.cashOut === '') {
                setResults(false);
                // console.log('Empty Row. Result State is now' + results);
                return;
            }
            if (Number(player.cashOut) < 0 || Number(player.buyIn) < 0){
                setResults(false)
                return;
            }
    
            totalBuyIn += Number(player.buyIn);
            totalCashOut += Number(player.cashOut);
        }
    
        console.log(`Buy IN TOTAL = ${totalBuyIn} & CashOut Total = ${totalCashOut}`)
        if (totalBuyIn != totalCashOut) {
            setResults(true);
            setValues({buyIn: totalBuyIn, cashOut: totalCashOut});
            return;            
        }
    
       setResults(true);
    }
    

    function onBackPressed(){
        console.log('onBackPressed Called');
        setValues({buyIn: '', cashOut: ''});
        setResults(false);
    }

    function onRemovePlayerBtnClick(id){
        setPlayers(currentPlayers => {
            return currentPlayers.filter(player => player.id !== id);
        });   
    }
    
   return (
        <div>
            {results ? 
            
            (values.buyIn === values.cashOut ? 

                <Results players={players} onBackPressed={onBackPressed}/>
                : <InvalidValueWarning 
                    totalCashOut={values.cashOut} 
                    totalBuyIn={values.buyIn}
                    onBackPressed={onBackPressed}
                />) 
                
            : (<PlayerForm
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

    
    function calculatePayouts(){
        for (const player of players){

            
        }
    }
}






