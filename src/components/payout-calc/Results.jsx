export default function Results({ players, onBackPressed, testPaymentDetails: payments }){
    console.log(payments);

    return (
        <div className="flex flex-col p-2 border-2 items-center">
            <h1 className="text-2xl py-2">Profit / Loss</h1>

            <ul className={`py-2`}>
                {players.map(player => {
                    return (            
                            <li className="" key={player.id}>
                                {console.log(Number(player.cashOut - player.buyIn) > 0 ? "text-black" : "text-red-950")}
                                {`${player.name} : £${Number(player.cashOut - player.buyIn).toFixed(2)}`}
                            </li>
                    ) 
                })} 
            </ul>
            <br></br>
            <h2 className="text-2xl py-2">Payouts Required</h2>           
            {payments.map((detail, index) => {
                return (
                    <p className="py-2" key={index}>{` - ${detail}`}</p>
                )
            })}
            <br></br>
            <button className="font-sans px-6 py-2 hover:shadow-md text-white bg-gray-800 rounded-full
                                    hover:bg-gray-700 transition-colors duration-300" onClick={onBackPressed}>Back</button>
        </div>

    )
}