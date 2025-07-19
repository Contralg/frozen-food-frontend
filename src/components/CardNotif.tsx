import React from 'react'
import '../styles/CardNotif.css'

interface CardNoitfProps {
    isAlert     : number;
    textTitle   : string;
    textContent : string;
}

const CardNotif : React.FC<CardNoitfProps> = ({isAlert, textTitle, textContent}) => {

  return (
    <>
        <div className={`css-cardnotif-001-${isAlert}`}>
            <div className={`css-cardnotif-002-${isAlert}`}>{textTitle}:</div>
            <div className={`css-cardnotif-003-${isAlert}`}>{textContent}</div>
        </div>
    </>
  )
}

export default CardNotif