export function InvalidValueWarning({ totalBuyIn, totalCashOut, onBackPressed }){
    return (
        
        <div className="payout-warning">
            <p>The buyin and cashout values do not match</p>
            <p>Total buy-in: {totalBuyIn}. Total cashout: {totalCashOut} </p>
            <button onClick={onBackPressed}>Back</button>
        </div>     
    )
}