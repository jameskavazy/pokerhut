import { FormRow } from './FormRow'

export function PlayerForm({ submitForm, handleInputChange, newRow, onAddPlayerBtnClick, onRemovePlayerBtnClick }){
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