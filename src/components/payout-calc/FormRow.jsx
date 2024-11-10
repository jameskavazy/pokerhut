export function FormRow({ id, name, buyIn, cashOut, onInputChange, onRemovePlayerBtnClick}){
    return (
        <>  
           
                <label className="">Name</label>
                <input 
                    id={id} 
                    className="border-slate-400 border-solid border rounded w-full" 
                    type="text" 
                    autoFocus 
                    placeholder={"Enter Name"} 
                    value={name} 
                    onChange={(e) => onInputChange(id, 'name', e.target.value)}
                />
            
            
            
                <label className="">Bought In</label>
                <input 
                    className="border-slate-400 border-solid border rounded w-full" 
                    type="number" 
                    placeholder="Buy In" 
                    value={buyIn}
                    onChange={(e) => onInputChange(id, 'buyIn', e.target.value)}
                
                />
           
            
                <label className="">Cashed Out</label>
                <input 
                    className="border-slate-400 border-solid border rounded w-full" 
                    type="number" 
                    placeholder="Cash Out"
                    value={cashOut}
                    onChange={(e) => onInputChange(id, 'cashOut', e.target.value)}
                />
            
            <button className="font-sans px-3 py-1 hover:shadow-md text-red-600 bg-gray-100 rounded-full
                hover:bg-red-400 transition-colors duration-300" 
                type="button" 
                onClick={() => onRemovePlayerBtnClick(id)}>X</button>
            <br></br><br></br>
        </>
    );
}