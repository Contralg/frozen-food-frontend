import React, { useEffect, useState } from 'react'
import '../styles/TableTransactions.css'
import { useAuth } from '../context/AuthContext'

interface TableTransactionsProps {
    page: string
}

const TableTransactions : React.FC<TableTransactionsProps> = ({ page }) => {

    const { transactionsData, getTransactionsData, reportData, productsData } = useAuth()
    const [displayData, setDisplayData] = useState<any[]>([])
    const [stringDate, setStringDate] = useState<any[]>([])
    const [stringProduct, setStringProduct] = useState<any[]>([])
    
    useEffect(() => {
        getTransactionsData()
        if(transactionsData.length > 1) {
            if(page === 'dashboard'){
                let rawData             = transactionsData.slice(0,6)
                let dateData            = rawData.map(item => `${new Date(item.transaction_date).toLocaleDateString()} :: ${new Date(item.transaction_date).getHours()}:${new Date(item.transaction_date).getMinutes()}:${new Date(item.transaction_date).getSeconds()}`)
                setStringDate(dateData)
                let rawProductData      = rawData.map(item => item.transaction_product.map(item2 => item2.product_id))
                let newStringProduct    = []
                for (let x in rawProductData) {
                    let newData = []
                    for (let y in rawProductData[x]) {
                        let newString = (productsData.find(item => item.product_id === rawProductData[x][y])?.product_name)
                        if(newString !== undefined){
                            newData.push(newString)
                        }
                    }
                    newStringProduct.push(newData.join(", "))
                }
                setStringProduct(newStringProduct)
                setDisplayData(rawData)
            }
        }
    }, [reportData])

    function checkEven(value: number): boolean {
        return value % 2 === 0;
    }

  return (
    <>
        <table>
            <thead>
                <tr className='css-tabletrans-001'>
                    <th className='css-tabletrans-003'>No</th>
                    <th>Tanggal Transaksi</th>
                    <th>Produk Dibeli</th>
                    <th>Nilai Pembayaran</th>
                </tr>
            </thead>
            <tbody>
                {displayData.map((row, index) => (
                    <tr key={index} className={`css-tabletrans-002-${checkEven(index+1)? 'even' : 'odd'}`}>
                        <td className='css-tabletrans-003'>{index + 1}</td>
                        <td className='css-tabletrans-003'>{stringDate[index]}</td>
                        <td className='css-tabletrans-003'>{stringProduct[index]}</td>
                        <td className='css-tabletrans-003'>Rp. {row.transaction_price.toLocaleString('id-ID')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default TableTransactions