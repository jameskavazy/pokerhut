import CtaButton from '../home/CtaButton';
import { FormRow } from './FormRow'


export default function PlayerForm({ submitForm, handleInputChange, players, onAddPlayerBtnClick, onRemovePlayerBtnClick }){


    if (players === undefined) {
        players = [{id: '1', name: '', buyIn: '', cashOut: ''}];
    }
    return (
            <div className="lg:mt-16 sm:mt-6 md:mt-10 p-10">
                <h1 className='text-2xl md:text-3xl sm:text-xl text-center'>Payout Calculator</h1>
                
                
                <div className="flex lg:flex-row flex-col justify-center lg:w-2/3 md:w-3/4 sm:w-11/12 mx-auto">
                                       
                    <form data-testid="player-form-item" action={submitForm}>                        
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
                       
                        
                        <button className='font-sans px-8 py-2 hover:shadow-md text-white bg-blue-500 rounded-full
                                hover:bg-blue-200 transition-colors duration-300' onClick={onAddPlayerBtnClick}>Add Player</button> 
                        <br></br>
                        <br></br>
                        <button className="font-sans px-8 py-2 hover:shadow-md text-white bg-gray-800 rounded-full
                                hover:bg-gray-700 transition-colors duration-300" type="submit">
                            Submit
                        </button>
                    </form>
                </div> 
                           
            </div>
            
    );

}