import React from 'react'
import '../styles/TextButton.css'

interface TextButtonProps {
    text    : string;
    onclick : () => void;
}

const TextButton : React.FC<TextButtonProps> = ({ text, onclick }) => {
  
    
  return (
    <>
        <button className='css-textbutton-001' type='button' onClick={onclick}>{text}</button>
    </>
  )
}

export default TextButton