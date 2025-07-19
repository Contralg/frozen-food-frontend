import React from 'react'
import '../styles/CardText.css'

interface CardTextProps  {
    textTop    : string | number | undefined;
    textBot    : string;
}

const CardText : React.FC<CardTextProps> = ({textTop, textBot}) => {
  return (
    <>
        <div className='css-cardtext-001'>
            <div className='css-cardtext-002'>{textTop}</div>
            <div className='css-cardtext-003'>{textBot}</div>
        </div>
    </>
  )
}

export default CardText