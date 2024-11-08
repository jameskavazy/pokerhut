export default function DateCard({event}){
    const dateOfMonth = new Date(event.time).getDate("en-gb")
    const month = new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'});
    

    return (
        <div className="rounded-3xl border-2 bg-white p-4 flex flex-col items-center">
            <p className="text-xl font-bold">{`${dateOfMonth}`}</p>
            <p className="text-base">{month}</p>
        </div>
    );
}