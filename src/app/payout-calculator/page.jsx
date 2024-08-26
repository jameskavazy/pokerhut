'use client'
import { useState } from 'react'
import { PlayerForm } from "./PlayerForm"
import { Results } from "./Results"

import './payout.css'

export default function Payout(){
    const id = crypto.randomUUID();
    const [newRow, setNewRow] = useState([
        { id: id, name: '', buyIn: '', cashOut: ''}]
    );

    const [results, setResults] = useState(false);

    function onAddPlayerBtnClick(){

        setNewRow((previousRow) => {
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

        setNewRow((currentRows) => 
            currentRows.map(row => 
                row.id === id ? {...row, [field]: value } : row
        ));
    }
    

    function submitForm() {
        for (const row of newRow){
            if (row.name === '' || row.buyIn === '' || row.cashOut === '') {
                setResults(false);
                console.log('Empty Row. Result State is now' + results);
                return;
            }

        }
       setResults(true);
       
    }

    function onBackPressed(){
        console.log('onBackPressed Called');
        setResults(false);
    }

    function onRemovePlayerBtnClick(id){
        setNewRow(currentRows => {
            return currentRows.filter(row => row.id !== id)
        })   
    }
    
   return (
        <div>
            {results ? (
                <Results newRow={newRow} onBackPressed={onBackPressed}></Results>
                ) : (
                     <PlayerForm
                        submitForm={submitForm} 
                        newRow={newRow} 
                        handleInputChange={handleInputChange}
                        onAddPlayerBtnClick={onAddPlayerBtnClick}
                        onRemovePlayerBtnClick={onRemovePlayerBtnClick}    
                        /> 
                     )}
        </div>     
    );    
}

