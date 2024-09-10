export default function Results({ players, onBackPressed, testPaymentDetails: payments }){
    console.log(payments);

    return (
        <>
            <h2>Profit / Loss</h2>
            <ul className='list'>

                {players.map(player => {
                    return (
                        <>

                            <li key={player.id}>
                                {`${player.name} : £${Number(player.cashOut - player.buyIn).toFixed(2)}`}
                            </li>
                        </>
                    ) 
                })} 
            </ul>
            <h2>Payouts Required</h2>           
            {payments.map((detail, index) => {
                return (
                    <p key={index}>{` - ${detail}`}</p>
                )
            })}
            
            <button onClick={onBackPressed}>Back</button>
        </>

    )
}