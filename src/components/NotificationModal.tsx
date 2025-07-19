import React, { useEffect, useState } from 'react'
import '../styles/NotificationModal.css'
import SuccessIcon from '../assets/SuccessIcon.svg'
import FailedIcon from '../assets/FailedIcon.svg'
import { useAuth } from '../context/AuthContext'

interface NotificationModalProps {
    transaction_id : string,
    transaction_price : number | string
    success: boolean
    message: string | any
}

const NotificationModal : React.FC<NotificationModalProps> = ({transaction_id, transaction_price, success, message}) => {

    const { changeModalNotification } = useAuth()

    function normalizeId (code: string) {
        const [, numberStr] = code.split('-')
        const number = parseInt(numberStr, 10)
        const newNumberStr = number.toString()
        return `${newNumberStr}`
    } 

    const [newId, setNewId] = useState<string>('')
    useEffect(() => {
        if(transaction_id) {
            setNewId(normalizeId(transaction_id))
        }
    }, [transaction_id])

    const handleButton = () => {
        changeModalNotification(false)
    }

  return (
    <>
        <div className='css-notificationmodal-001'>
            <div className='css-notificationmodal-002'></div>
            <div className='css-notificationmodal-003'>
                <div className='css-notificationmodal-004'>
                    <img src={success? SuccessIcon : FailedIcon} alt='SuccessIcon' className='css-notificationmodal-005'></img>
                    <div className='css-notificationmodal-006'>{success? 'Transaksi Berhasil!' : 'Transaksi Gagal!'}</div>
                    <div className='css-notificationmodal-007'>Transaksi #{newId} Rp {transaction_price}</div>
                    <button type='button' className={`css-notificationmodal-008-${success? 'true' : 'false'}`} onClick={handleButton}>{success? 'Lanjutkan' : 'Coba Lagi'}</button>
                    <div className={`css-notificationmodal-009-${success? 'true' : 'false'}`}></div>
                    <div className='css-notificationmodal-010'>{message}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default NotificationModal