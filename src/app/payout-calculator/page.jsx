'use client'
import { useState } from 'react'
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
        if (newRow.length === 0) {
           setResults(false);
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

function FormRow({ id, name, buyIn, cashOut, onInputChange, onRemovePlayerBtnClick}){
    return (
        <div> 
            <input 
                id={id} 
                className="name-input" 
                type="text" 
                autoFocus 
                placeholder={"Player Name"} 
                value={name} 
                onChange={e => onInputChange(id, 'name', e.target.value)}
            />
                
            <input 
                className="buy-in-input" 
                type="number" 
                placeholder="Buy In" 
                value={buyIn}
                onChange={(e => onInputChange(id, 'buyIn', e.target.value))}
            
            />
            <input 
            className="cash-out-input" 
            type="number" 
            placeholder="Cash Out"
            value={cashOut}
            onChange={(e) => onInputChange(id, 'cashOut', e.target.value)}
            />
            <button onClick={() => onRemovePlayerBtnClick(id)}>Remove</button>
            
            <br></br><br></br>
        </div>
    );
}


function Results({ newRow, onBackPressed }){
    return (
        <>
            <ul className='list'>
                {newRow.map(row => {
                    return (
                        <li key={newRow.id}>
                            {`${row.name} : £${Number(row.cashOut - row.buyIn)}`}
                        </li>
                    ) 
                })} 
            </ul>
            <button onClick={onBackPressed}>Back</button>
        </>

    )
}



function PlayerForm({ submitForm, handleInputChange, newRow, onAddPlayerBtnClick, onRemovePlayerBtnClick }){
    return (
        
            <div className="payout-container">
                <div className="form-row">
                    <form action={submitForm} className="new-player-form">
                        {newRow.map((row) => (
                            <FormRow
                                key={row.id}
                                id={row.id}
                                name={row.name}
                                buyIn={row.buyIn}
                                cashOut={row.cashOut}
                                onInputChange={handleInputChange} 
                                onRemovePlayerBtnClick={onRemovePlayerBtnClick}
                            />

                        ))}  
                        <button type='button' onClick={onAddPlayerBtnClick}>Add Player</button> 
                        <br></br><br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>            
            </div>
            
    );
}


