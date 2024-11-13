export function FormRow({ id, name, buyIn, cashOut, onInputChange, onRemovePlayerBtnClick}){
    return (
        <>
        <div className="flex flex-col ">  
           
            <span className="flex justify-end gap-2">
                <label className="text-xs md:text-md">Name</label>
                    <input 
                        id={id} 
                        className="border-slate-400 border-solid border rounded" 
                        type="text" 
                        autoFocus 
                        placeholder={"Enter Name"} 
                        value={name} 
                        onChange={(e) => onInputChange(id, 'name', e.target.value)}
                        />
            </span>
                
            
            
            <span className="flex justify-end gap-2">
                <label className="text-xs md:text-md">Buy In</label>
                <input 
                    className="border-slate-400 border-solid border rounded" 
                    type="number" 
                    placeholder="Buy In" 
                    value={buyIn}
                    onChange={(e) => onInputChange(id, 'buyIn', e.target.value)}
                    
                    />
            </span>

            <span className="flex justify-end gap-2">
                <label className="text-xs md:text-md">Cash Out</label>
                <input 
                    className="border-slate-400 border-solid border rounded" 
                    type="number" 
                    placeholder="Cash Out"
                    value={cashOut}
                    onChange={(e) => onInputChange(id, 'cashOut', e.target.value)}
                    />
            </span>           
            
            
        </div>

        <div className="text-end p-2">
        <button className="font-sans px-3 py-1 hover:shadow-md text-red-600 bg-gray-100 rounded-full
            hover:bg-red-400 transition-colors duration-300" 
            type="button" 
            onClick={() => onRemovePlayerBtnClick(id)}>X</button>
        </div>
        </>
    );
}