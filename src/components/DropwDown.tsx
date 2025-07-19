import React, { useState } from 'react'
import '../styles/DropDown.css'
import { FaAngleDown } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';


interface DropDown {
    text        : string;
    value       : Array<string>;
    ctg_id      : Array<string>
}

const DropwDown : React.FC<DropDown> = ({ text, value, ctg_id }) => {

    const { sortPorducts } = useAuth()

    const [isDropDown, setIsDropDown] = useState<boolean>(false);

    const handleDropDown = () => {
        setIsDropDown(!isDropDown)
    }

    const handleClickDropdown = (value: string) => {
        setIsDropDown(false)
        sortPorducts(value)
    }

  return (
    <>  
        <div className='css-dropdown-001'>
            <button className='css-dropdown-002' type='button' onClick={handleDropDown}>{text} <div className={`css-dropdown-004-${isDropDown? 'open' : 'close'}`}><FaAngleDown /></div></button>
            <div className={`css-dropdown-003-${isDropDown? 'open' : 'close'}`}>
                    <button className='css-dropdown-004' onClick={() => handleClickDropdown('')}>Semua</button>
                {value.map((row, index) => (
                    <button key={index} className='css-dropdown-004' onClick={() => handleClickDropdown(ctg_id[index])}>{row}</button>
                ))}
            </div>
        </div>
    </>
  )
}

export default DropwDown