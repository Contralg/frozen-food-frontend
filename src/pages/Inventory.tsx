import { useEffect, useState } from 'react'
import '../styles/Inventory.css'
import Header from '../components/Header'
import PagesButton from '../components/PagesButton'
import DashboardIcon from '../assets/dashboard.svg'
import PosIcon from '../assets/pos.svg'
import StorageIcon from '../assets/storage.svg'
import ReportIcon from '../assets/report.svg'
import SearchBar from '../components/SearchBar'
import TableComp from '../components/TableComp'
import DropwDown from '../components/DropwDown'
import { useAuth } from '../context/AuthContext'
import FormSubmit from '../components/FormSubmit'


const Inventory = () => {

    const { getProductsData, categoryData, getCategory, isEditProduct, changeIsEditProduct, isSuccessEdit, isSuccessDelete, filteredProducts, useDefaultData, resetAllData } = useAuth();

    const [openInput, setOpenInput] = useState<boolean>(false)
    const handleOpenInput = () => {
        setOpenInput(!openInput)
    }

    const [openInputCategory, setOpenInputCategory] = useState<boolean>(false)
    const handleOpenInputCategory = () => {
        setOpenInputCategory(true)
    }

    const handleCloseForm = () => {
        setOpenInput(false)
        setOpenInputCategory(false)
        changeIsEditProduct(false)
    }

    const handleClikUseDefault = () => {
        useDefaultData()
    }

    const handleClickResetData = () => {
        resetAllData()
    }

    useEffect(() => {
        getProductsData()
        getCategory()
    }, [isEditProduct, isSuccessEdit, isSuccessDelete])

    useEffect(() => {
        handleCloseForm()
    }, [isSuccessEdit])    

  return (
    <>
        <div>
            <Header />
        </div>
        <div className='css-inventory-001'>
            <div className='css-inventory-002'>
                <div className='css-inventory-003'>
                    <PagesButton 
                        icon    = {DashboardIcon}
                        text    = {'Dashboard'}
                        onclick = {'dashboard'}
                    />
                    <PagesButton 
                        icon    = {PosIcon}
                        text    = {'Jualan'}
                        onclick = {'pos'}
                    />
                    <PagesButton 
                        icon    = {StorageIcon}
                        text    = {'Penyimpanan'}
                        onclick = {'inventory'}
                    />
                    <PagesButton 
                        icon    = {ReportIcon}
                        text    = {'Laporan'}
                        onclick = {'report'}
                    />
                </div>
                <div className='css-inventory-005'>
                    <SearchBar />
                    <div className='css-inventory-006'>
                        <div className='css-inventory-010'>
                            <button className='css-inventory-007' type='button' onClick={handleOpenInput}>+ Tambah Produk</button>
                            <button className='css-inventory-007' type='button' onClick={handleOpenInputCategory}>+ Tambah Kateogri</button>
                        </div>
                        <div className='css-inventory-010'>
                            <button className='css-inventory-011' type='button' onClick={handleClikUseDefault}>Gunakan Data Percobaan</button>
                            <button className='css-inventory-011' type='button' onClick={handleClickResetData}>Hapus Semua Data</button>
                        </div>
                    </div>
                    <div className='css-inventory-006'>
                        <DropwDown 
                            text    = {'Kategori'}
                            value   = {categoryData.map(item => item.category_name)}
                            ctg_id  = {categoryData.map(item => item.category_id)}
                        />
                    </div>
                </div>
                <div className='css-inventory-008'>
                    <TableComp 
                        header={['No', 'Nama', 'Harga', 'Stock', 'Status','Kategori', 'Aksi']}
                        data = {filteredProducts}
                    />
                </div>
            </div>
        </div>
        <div className={`css-input-001-${openInput || openInputCategory || isEditProduct? 'open' : 'close'}`}></div>
        <div className={`css-input-002-${openInput || isEditProduct? 'open' : 'close'}`}>
            <div className='css-input-003'>
                <div className='css-input-011'>
                    <div className='css-input-012'>{isEditProduct? 'Edit Data Produk' : 'Input Data Produk'}</div>
                    <button className='css-input-009' onClick={handleCloseForm}>Close</button>
                </div>
                <FormSubmit 
                    usage='product'
                    formSet={[
                        {type: "text",
                            name: "product_name",
                            placeHolder: "Masukkan Nama Produk"   
                        },
                        {type: "text",
                            name: "product_description",
                            placeHolder: "Masukkan Deskripsi Produk"   
                        },
                        {type: "number",
                            name: "product_price",
                            placeHolder: "Masukkan Harga Produk"   
                        },
                        {type: "number",
                            name: "product_stock",
                            placeHolder: "Masukkan Stok Awal Produk"   
                        },
                        {type: "select",
                            name: "category_id",
                            placeHolder: "Pilih Category"   
                        },
                    ]}
                />
                </div>
        </div>
        <div className={`css-input-003-${openInputCategory? 'open' : 'close'}`}>
            <div className='css-input-003'>
                <div className='css-input-011'>
                    <div className='css-input-012'>Input Data Kategori</div>
                    <button className='css-input-009' onClick={handleCloseForm}>Close</button>
                </div>
                <FormSubmit 
                    usage='category'
                    formSet={[
                        {
                            type: "text",
                            name: "category_name",
                            placeHolder: "Masukkan Nama Kategori"
                        },
                        {
                            type: "select",
                            name: "icon",
                            placeHolder: "Pilih Icon"
                        }
                    ]}
                />
            </div>
        </div>
    </>
  )
}

export default Inventory