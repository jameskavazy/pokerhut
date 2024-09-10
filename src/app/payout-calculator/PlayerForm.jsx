import { FormRow } from './FormRow'


export default function PlayerForm({ submitForm, handleInputChange, players, onAddPlayerBtnClick, onRemovePlayerBtnClick }){


    if (players === undefined) {
        players = [{id: '1', name: '', buyIn:'', cashOut: ''}]
    }
    return (
      
       
            <div className="payout-container">
                <div className="headers">
                    <p>Name</p><p>Buy In</p><p>Cash Out</p>
                </div>
                <div className="form-row">
                    <form data-testid="player-form-item" action={submitForm} className="new-player-form">
                        {players.map((player) => (
                            <FormRow
                                key={player.id}
                                id={player.id}
                                name={player.name}
                                buyIn={player.buyIn}
                                cashOut={player.cashOut}
                                onInputChange={handleInputChange} 
                                onRemovePlayerBtnClick={onRemovePlayerBtnClick}
                            />
                        ))}  
                        <button type='button' onClick={onAddPlayerBtnClick}>Add Player</button> 
                        <br></br>
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>            
            </div>
            
    );

}