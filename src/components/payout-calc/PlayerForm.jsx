import CtaButton from '../home/CtaButton';
import { FormRow } from './FormRow'


export default function PlayerForm({ submitForm, handleInputChange, players, onAddPlayerBtnClick, onRemovePlayerBtnClick }){


    if (players === undefined) {
        players = [{id: '1', name: '', buyIn:'', cashOut: ''}]
    }
    return (
            <div className="justify-center">

                <h1 className='text-2xl md:text-3xl ms-14'>Payout Calculator</h1>
                
                <div className="justify-around md:p-14 mt-8 ">
                    <form className="justify-end " data-testid="player-form-item" action={submitForm}>
                        
                        
                        
                        <div className='md:w-[48rem]'>
                            <div className='md:w-[48rem] md:visible hidden md:flex md:justify-around md:ml-[-5rem] '>
                                <p >Name</p>
                                <p className='md:ml-[-1rem]'>Bought In</p>
                                <p className='md:ml-[-6rem]'>Cashed Out</p>
                            </div>
                            
                            
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

                        </div>
                        
                    </form>
                </div>            
            </div>
            
    );

}