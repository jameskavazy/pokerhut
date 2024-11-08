export default function InvalidValueWarning({ totalBuyIn, totalCashOut, onBackPressed }){
    
    return (
                <div className="flex flex-col justify-center items-center mt-16 mb-16" data-testid="payout-warning">
                    <p className="text-lg">The buy-in and cash-out values do not match</p>
                    <p className="text-lg">Total buy-in: {totalBuyIn}. Total cashout: {totalCashOut} </p>
                <br></br>
                <button className="font-sans md:px-6 md:py-2 text-sm hover:shadow-md text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" 
                    onClick={onBackPressed}>Back</button>
                </div>
    );
}