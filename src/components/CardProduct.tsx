import React from 'react'
import '../styles/CardProduct.css'
import { useAuth } from '../context/AuthContext';

interface CardProductProps {
    hidden      : boolean;
    icon        : string;
    name        : string;
    price       : any;
    stock       : any;
    onclick     : string;
}

const CardProduct : React.FC<CardProductProps> = ({ hidden, icon, name, price, stock, onclick }) => {

    const { buyProducts } = useAuth()
    const handleClickProducts = () => {
      buyProducts(onclick)
    }

  return (
    <>
        <button className={`css-cardproduct-001-${hidden? 'true' : 'false'}`} type='button' onClick={handleClickProducts} disabled={hidden}>
            <img src={icon} alt={name} className='css-cardproduct-002'></img>
            <div className='css-cardproduct-003'>{name}</div>
            <div className='css-cardproduct-004'>Rp. {Number(price).toLocaleString('id-ID')}</div>
            <div className='css-cardproduct-005'>Stock: {stock}</div>
        </button>
    </>
  )
}

export default CardProduct