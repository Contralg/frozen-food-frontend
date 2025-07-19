import React, { useEffect } from 'react'
import '../styles/TableComp.css'
import { useAuth } from '../context/AuthContext';
import EditIcon from '../assets/EditIcon.svg';
import DeleteIcon from '../assets/DeleteIcon.svg'
import EditNotificationModal from './EditNotificationModal';
import DeleteNotificationModal from './DeleteNotificationModal';

interface TableComp {
    header  : Array<String>;
    data    : Array<any>;
}

const TableComp : React.FC<TableComp> = ({ header, data }) => {

    const { getCategory, categoryData, changeIsEditProduct, getEditProduct, changeIsDeleteProduct, isSuccessEdit, changeisSuccessEdit, changeIsSuccessDelete, isSuccessDelete } = useAuth()

    useEffect(() => {
        getCategory
    },[])

    const handleClikEdit = (prod_id: string) => {
        changeIsEditProduct(true)
        getEditProduct(prod_id)
    }

    const handleClickDelete = (prod_id: string, _prod_name: string) => {
        changeIsDeleteProduct(prod_id)
        changeIsSuccessDelete(true, 0)
    }

    useEffect(() => {
        if(isSuccessEdit.status || isSuccessDelete.status){
            const timer = setTimeout(() => {
                changeisSuccessEdit(false)
                changeIsSuccessDelete(false, 0)
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [isSuccessEdit, isSuccessDelete])

  return (
    <>
        <table className='css-tablecomp-001'>
            <thead>
                <tr>
                    {header.map((row, index) => (
                        <th key={index} >{row}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td className='css-tablecomp-002'>{index+1}</td>
                        <td className='css-tablecomp-002'>{row.product_name}</td>
                        <td className='css-tablecomp-002'>Rp. {Number(row.product_price).toLocaleString('id-ID')}</td>
                        <td className='css-tablecomp-002'>{row.product_stock}</td>
                        <td className='css-tablecomp-002'>{row.product_stock > 20 ? 'Aman' : 'Stock Sedikit'}</td>
                        <td className='css-tablecomp-002'>{categoryData.map(value => value.category_id === row.category_id? value.category_name : '')}</td>
                        <td className='css-tablecomp-002'>
                            <div className='css-tablecomp-003'>
                                <img src={EditIcon} alt='edit' className='css-tablecomp-004' onClick={() => handleClikEdit(row.product_id)}></img>
                                <img src={DeleteIcon} alt='delete' className='css-tablecomp-004' onClick={() => handleClickDelete(row.product_id, row.product_name)}></img>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className={`css-tablecomp-005-${isSuccessEdit.status? 'true' : 'false'}`}>
                <EditNotificationModal />
        </div>
        <div className={`css-tablecomp-006-${isSuccessDelete.status? 'true' : 'false'}`}>
                <DeleteNotificationModal 
                    product_id=''
                />
        </div>
    </>
  )
}

export default TableComp