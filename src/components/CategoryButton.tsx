import React from 'react'
import '../styles/CategoryButton.css'
import { useAuth } from '../context/AuthContext';

interface CategoryButtonProps {
    text        : string;
    onclick     : string;
    active      : boolean;
}

const CategoryButton : React.FC<CategoryButtonProps> = ({ text, onclick, active }) => {

    const { sortPorducts } = useAuth()
    const handleChageSort = () => {
      sortPorducts(onclick)
    }

  return (
    <>
        <button className={`css-categorybutton-001-${active? 'true' : 'false'}`} type='button' onClick={handleChageSort}>
            <div className={`css-categorybutton-003-${active? 'true' : 'false'}`}>{text}</div>
        </button>
    </>
  )
}

export default CategoryButton