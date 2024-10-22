export default function NavButtonPrimary({children}) {
    return (
        <button className="font-sans md:px-6 md:py-4 px-1 py-1 text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" >
                {children}
        </button>
    )
}