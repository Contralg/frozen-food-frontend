import React from 'react'
import "../styles/DeleteNotificationModal.css"
import { useAuth } from '../context/AuthContext'
import FailedIcon from '../assets/FailedIcon.svg'

interface DeleteNotificationModalProps {
    product_id : string
}

const DeleteNotificationModal : React.FC<DeleteNotificationModalProps> = ({  }) => {

    const { isDeleteProduct, isSuccessDelete, deleteProduct, changeIsSuccessDelete } = useAuth()

    const handleCancelDelete = () => {
        changeIsSuccessDelete(false, 0)
    }

    const handleProcessDelete = (prod_id: string) => {
        deleteProduct(prod_id)
    }

  return (
    <>
        <div className='css-deletenotif-001'>
            <div className='css-deletenotif-002'></div>
            <div className='css-deletenotif-003'>
                <div className='css-deletenotif-004'>
                    <img src={FailedIcon} alt='SuccessIcon' className='css-deletenotif-010'></img>
                    <div className='css-deletenotif-005'>{isSuccessDelete.status && isSuccessDelete.count === 1? 'Berhasil Delete Data' : 'Hapus Data Ini?'}</div>
                    <div className='css-deletenotif-006'>
                        <table className='css-deletenotif-007'>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Stock</th>
                                    <th>Kategori</th>
                                    <th>Ikon</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='css-deletenotif-008'>{isDeleteProduct?.product_name}</td>
                                    <td className='css-deletenotif-008'>Rp {isDeleteProduct?.product_price}</td>
                                    <td className='css-deletenotif-008'>{isDeleteProduct?.product_stock}</td>
                                    <td className='css-deletenotif-008'>{isDeleteProduct?.category_id}</td>
                                    <td className='css-deletenotif-008'>
                                        <img src={isDeleteProduct?.product_icon} alt='SuccessIcon' className='css-deletenotif-009'></img>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img src={isDeleteProduct?.product_icon} alt='SuccessIcon' className='css-deletenotif-014'></img>
                    </div>
                    <div className={`css-deletenotif-011-${isSuccessDelete.status && isSuccessDelete.count === 1? 'true' : 'false'}`}>
                        <button type='button' className='css-deletenotif-012' onClick={() => handleProcessDelete(isDeleteProduct.product_id)}>Hapus</button>
                        <button type='button' className='css-deletenotif-013' onClick={handleCancelDelete}>Batal</button>
                    </div>
                    <button type='button' className={`css-deletenotif-015-${isSuccessDelete.status && isSuccessDelete.count === 1? 'true' : 'false'}`}>Lanjutkan</button>
                    <div className={`css-deletenotif-016-${isSuccessDelete.status && isSuccessDelete.count === 1? 'true' : 'false'}`}></div>
                    <div className={`css-deletenotif-017-${isSuccessDelete.status && isSuccessDelete.count === 1? 'true' : 'false'}`}>Otomatis tertutup dalam 3 detik</div>                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteNotificationModal