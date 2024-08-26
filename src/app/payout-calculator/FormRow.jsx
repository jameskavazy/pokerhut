export function FormRow({ id, name, buyIn, cashOut, onInputChange, onRemovePlayerBtnClick}){
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
            <button type="button" onClick={() => onRemovePlayerBtnClick(id)}>Remove</button>
            <br></br><br></br>
        </div>
    );
}