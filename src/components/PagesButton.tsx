import React from 'react'
import '../styles/PagesButton.css'
import { useNavigate } from 'react-router-dom';

interface PagesButtonProps {
    icon    : string;
    text    : string;
    onclick : string;
}

const PagesButton : React.FC<PagesButtonProps> = ({icon, text, onclick}) => {

  const navigate = useNavigate()

  return (
    <>
        <button className='css-pagesbutton-001' type='button' onClick={() => navigate(`/${onclick}`)}>
            <img className='css-pagesbutton-002' src={icon} alt={text}></img>
            <div className='css-pagesbutton-003'>{text}</div>
        </button>
    </>
  )
}

export default PagesButton