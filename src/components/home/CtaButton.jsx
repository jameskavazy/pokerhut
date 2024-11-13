export default function CtaButton({children}) {
    return (
        <button className="font-sans px-8 py-2 md:px-6 md:py-4 text-sm hover:shadow-md text-white bg-gray-800 rounded-full
         hover:bg-gray-700 transition-colors duration-300" >
                {children}
        </button>
    )
}