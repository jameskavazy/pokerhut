'use client'
import { useState } from 'react'
import './payout.css'

export default function Payout(){
    const id = crypto.randomUUID();
    const [newRow, setNewRow] = useState([{ id: id, component: <FormRow key={id}/> }]);
    const [results, setResults] = useState(false);
    const [players, setPlayers] = useState([]);


    function onAddPlayerBtnClick(){

        setNewRow((previousRow) => {
            const newId = crypto.randomUUID();
            return [
                ...previousRow,
                { id: newId, component: <FormRow key={newId}/> }
            ]
        });
    }

    

    function submitForm(formData){
        
        for (const row in newRow){
            const name = formData.get(row.id)
            console.log(name);
        }
            // console.log(e.target.id)

            // // for (const row of newRow){
            // //     const name = formData.get(row.component.key);
            // //     console.log(name);
            // // }




        // const name = formData.get('name');
        // alert(`${name}`)
    }

    

    
    function onBackPressed(){
        setResults(false);
    }
    
   return (
        <div>
            {results ? (<Results></Results>) : (

                <>
                <div className="payout-container">
                    <div className="form-row">
                    
                        <form action={submitForm} className="new-player-form">
                            {newRow.map(row => (
                                row.component))}  
                            <button type='button' onClick={onAddPlayerBtnClick}>Add Player</button> 
                            <br></br><br></br>
                            <button type="submit">Submit</button>
                        </form>
                    </div>            
                </div>
                </>

            )}
        </div>     
    );    
}

function FormRow({ id }){
    //TODO pass id here to name=?
    return (
        <div> 
            <input id={id} className="name-input" type="text" autoFocus placeholder={"Player Name"}></input>
                <input className="buy-in-input" type="number" placeholder="Buy In" ></input>
                <input className="cash-out-input" type="number" placeholder="Cash Out" ></input>   
                <br></br><br></br>
        </div>
    );
}


function Results(){
    return (
        <>
            <ul className='list'>
                <li>
                    <p>Player 1</p>
                </li>
                <li>
                    <p>Player 1</p>
                </li>
            </ul>
            <button >Back</button>
        </>

    )
}






