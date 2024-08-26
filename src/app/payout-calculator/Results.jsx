
export function Results({ players, onBackPressed }){
    return (
        <>
            <ul className='list'>
                {players.map(player => {
                    return (
                        <li key={players.id}>
                            {`${player.name} : £${Number(player.cashOut - player.buyIn)}`}
                        </li>
                    ) 
                })} 
            </ul>
            <button onClick={onBackPressed}>Back</button>
        </>

    )
}