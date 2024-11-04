export default function DateCard({event}){
    const dateOfMonth = new Date(event.time).getDate("en-gb")
    const month = new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'});
    

    return (
        <div className="border-r-2 border-black-100 bg-gray-50 flex flex-col items-center">
            <p className="text-xl">{`${dateOfMonth}`}</p>
            <p className="text-base">{month}</p>
        </div>
    );
}