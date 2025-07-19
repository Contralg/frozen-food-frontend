import React, { useEffect, useState } from 'react'
import '../styles/ShoppingCart.css'
import CartIcon from '../assets/cart.svg'
import { useAuth } from '../context/AuthContext'
import NotificationModal from './NotificationModal'


const ShoppingCart = () => {

    const { firstRender, changeFirstRender, cartProducts, chageQty, counterItem, changeCounter, isTunai, changeIsTunai, getTransactionId, newTransactionId, addTransaction, clearTransaction, notificationTransaction, modalNotification, changeModalNotification } = useAuth()

    const [isProducts, setIsProducts] = useState<boolean>(false)
    useEffect(() => {
        if(cartProducts.length !== 0) {
            setIsProducts(true)
        } else (
            setIsProducts(false)
        )
    }, [cartProducts])

    // const [isTunai, setIsTunai] = useState<boolean>(true)
    const handleTunai = (value: boolean) => {
        changeIsTunai(value)
    }

    function checkEven(value: number): boolean {
        return value % 2 === 0;
    }

    const handleQty = (product_id: string | undefined, qty: any ) => {
        chageQty(product_id, qty)
    }

    const handleChangeCounter = (value: any) => {
        changeCounter(value)
    }

    const handleProcessBuy = () => {
        errorCheck()
    }

    
    const handleDeleteTransaction = () => {
        clearTransaction()
    }
    
    useEffect(() => {
        getTransactionId()
        changeFirstRender(true)
    }, [])
    
    useEffect(() => {
        if(notificationTransaction?.success) {
            changeModalNotification(true)
            const timer = setTimeout(() => {
                changeModalNotification(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [notificationTransaction])
    
    const [process, setProcess] = useState<Array<String | Boolean>>([])
    const errorCheck = () => {
        if(cartProducts.length > 0) {
            if(isTunai && counterItem?.total_change !== undefined && counterItem.total_change >= 0){
                setProcess([true, 'Otomatis tertutup dalam 3 detik'])
            } else {
                setProcess([false, 'Pembayaran Kurang'])
            }
        } else {
            setProcess([false, 'Tidak Ada Produk'])
        }
    }
    
    const handleKey = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            handleProcessBuy()
        }
        if(event.key === 'Delete') {
            clearTransaction()
        }
        if(event.key === 'Escape') {
            changeModalNotification(false)
        }
    }

    useEffect(() => {
        if(firstRender) {
            getTransactionId()
            if (process[0]) {
                let newTransaction = {
                                        transaction_id: newTransactionId, 
                                        transaction_product: cartProducts.map(value => ({product_id: value.product_id, product_qty: value.product_qty})), 
                                        transaction_price: counterItem?.total_price, 
                                        transaction_cash: counterItem?.total_cash, 
                                        transaction_tunai: isTunai,
                                        transaction_complete: isTunai, 
                                        transaction_date: new Date()}
                addTransaction(newTransaction)
                changeModalNotification(true)                                 
            } else {
                changeModalNotification(true)
            }
        }
    }, [process])
    
    return (
        <>
        <div className='css-shoppingcart-001' onKeyDown={handleKey} tabIndex={0}>
            <div className='css-shoppingcart-002'>
                <div className='css-shoppingcart-003'>
                    <img src={CartIcon} alt='Keranjang' className='css-shoppingcart-006'></img>
                    <div className='css-shoppingcart-007'>Keranjang Belanja</div>
                </div>
                <div className='css-shoppingcart-004'>Transaksi #{newTransactionId.split('-')[1]}</div>
            </div>
            <div className={`css-shoppingcart-005-${isProducts? 'true' : 'false'}`}>
                <img src={CartIcon} alt='Keranjang' className={`css-shoppingcart-008-${isProducts? 'true' : 'false'}`}></img>
                <div className={`css-shoppingcart-009-${isProducts? 'true' : 'false'}`}>Keranjang Belanja Kosong</div>
                <div className={`css-shoppingcart-010-${isProducts? 'true' : 'false'}`}>Tambahkan brang ke keranjang</div>
                <table className={`css-shoppingcart-024-${isProducts? 'true' : 'false'}`}>
                    <thead className='css-shoppingcart-025'>
                        <tr>
                            <th>Nama</th>
                            <th>Jumlah</th>
                            <th>Harga Satuan</th>
                            <th>Harga Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map((value, index) => (
                            <tr key={index} className={`css-shoppingcart-026-${checkEven(index+1)? 'even' : 'odd'}`}>
                                <td>{value.product_name}</td>
                                <td>
                                    <input type='number' value={value.product_qty} className='css-shoppingcart-027' onChange={(e) => handleQty(value.product_id, e.target.value)}></input>
                                </td>
                                <td>Rp. {Number(value.product_price).toLocaleString('id-ID')}</td>
                                <td>Rp. {Number(value.product_total).toLocaleString('id-ID')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='css-shoppingcart-011'>
                <div className='css-shoppingcart-012'>
                    <div>Total Belanja:</div>
                    <div>Rp. {counterItem?.total_price.toLocaleString('id-ID')}</div>
                </div>
                <div className='css-shoppingcart-012'>
                    <div className='css-shoppingcart-013'>
                        <div className='css-shoppingcart-023'>Pembayaran:</div>
                        <div className='css-shoppingcart-014'>
                            <button type='button' className={`css-shoppingcart-${isTunai? '015' : '016'}`} onClick={() => handleTunai(true)}>Tunai</button>
                        </div>
                    </div>
                    <div className='css-shoppingcart-017'>
                        <div className='css-shoppingcart-018'>Rp.</div>
                        <input type='number' className='css-shoppingcart-019' placeholder='Input Nominal' value={counterItem?.total_cash ?? ''} onChange={(e) => handleChangeCounter(e.target.value)}></input>
                    </div>
                </div>
                <div className='css-shoppingcart-012'>
                    <div>Kembalian:</div>
                    <div>Rp. {counterItem?.total_change?.toLocaleString('id-ID')}</div>
                </div>
                <div className='css-shoppingcart-020'>
                    <button className='css-shoppingcart-021' onClick={handleProcessBuy} onKeyDown={handleKey}>Proses Pembayar</button>
                    <button className='css-shoppingcart-022' onClick={handleDeleteTransaction}>Hapus</button>
                </div>
            </div>
        </div>
        <div className={`css-shoppingcart-028-${modalNotification? 'true' : 'false'}`}>
            <NotificationModal 
                transaction_id      = {process[0]? notificationTransaction?.transaction_id : newTransactionId}
                transaction_price   = {process[0]? notificationTransaction?.transaction_price : 0}
                success             = {process[0]? notificationTransaction?.success : false}
                message             = {process[1]}
            />
        </div>
    </>
  )
}

export default ShoppingCart