
export function Results({ newRow, onBackPressed }){
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