"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FiChevronDown } from "react-icons/fi"

export default function DropDownBox({user, options}){

    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);
    const router = useRouter();

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

  
    const handleOutsideClick = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)){
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        };
    }, []);


    return (
            <div ref={dropDownRef} className="p-2">
                <button
                className={`${isOpen && "border border-[#363a4115]"} px-4 py-2 flex items-center rounded border-2 border-[#0e030304] shadow-sm hover:shadow-md hover:bg-gray-200 bg-gray-100 transition duration-300`}
                onClick={toggleDropDown}>
                    <span className="flex"> 
                        <FiChevronDown size={24} className={`mr-2 ${isOpen && "rotate-180"}`}/> {`${user.username || user.name}`}
                    </span>
                </button>
                    {isOpen && (
                    <div className="absolute w-max bg-gray-50">
                        <ul className="z-20 border-2">
                            {options.map((option) => {
                                return (
                                <li key={option["id"]} >
                                    <button className={`flex z-20 items-center w-full gap-2 p-4 hover:bg-[#e7e7e7] rounded transition-all duration-200 `}
                                     onClick={() => {
                                                router.push(option["link"])
                                                setIsOpen(false);
                                            }}
                                        >{option["content"]}</button>
                                </li>
                                )
                            } )}
                        </ul>
                    </div>)}
            </div> 
        ); 
}
