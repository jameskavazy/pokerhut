export default function DateCard({event}){
    const dateOfMonth = new Date(event.time).getDate("en-gb")
    const month = new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'});
    

    return (
        <div className="md:border-r-2 p-4 flex flex-col h-full justify-center items-center">
            <p className="text-xl font-bold">{`${dateOfMonth}`}</p>
            <p className="text-base">{month}</p>
        </div>
    );
}