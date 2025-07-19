import '../styles/EditNotifiactionModal.css'
import SuccessIcon from '../assets/SuccessIcon.svg'
import { useAuth } from '../context/AuthContext'


const EditNotificationModal = () => {

    const { isSuccessEdit, changeisSuccessEdit } = useAuth()

    const handleClickClose = () => {
        changeisSuccessEdit(false)
    }

  return (
    <>
        <div className='css-editnotif-001'>
            <div className='css-editnotif-002'></div>
            <div className='css-editnotif-003'>
                <div className='css-editnotif-004'>
                    <img src={SuccessIcon} alt='SuccessIcon' className='css-editnotif-005'></img>
                    <div className='css-editnotif-006'>Berhasil Edit Data</div>
                    <div className='css-editnotif-007'>
                        <table className='css-editnotif-008'>
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
                                    <td className='css-editnotif-009'>{isSuccessEdit.data.product_name}</td>
                                    <td className='css-editnotif-009'>Rp {isSuccessEdit.data.product_price}</td>
                                    <td className='css-editnotif-009'>{isSuccessEdit.data.product_stock}</td>
                                    <td className='css-editnotif-009'>{isSuccessEdit.data.category_name}</td>
                                    <td className='css-editnotif-009'>
                                        <img src={isSuccessEdit.data.product_icon} alt='SuccessIcon' className='css-editnotif-010'></img>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type='button' className={`css-editnotif-011-${isSuccessEdit.status? 'true' : 'false'}`} onClick={handleClickClose} >Lanjutkan</button>
                    <div className={`css-editnotif-012-${true}`}></div>
                    <div className='css-editnotif-013'>Otomatis tertutup dalam 3 detik</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditNotificationModal