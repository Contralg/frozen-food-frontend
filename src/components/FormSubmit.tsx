import React, { useEffect, useState } from 'react'
import '../styles/FormSubmit.css'
import { useAuth } from '../context/AuthContext';
import { FaAngleDown } from "react-icons/fa";


interface FormSubmit {
    usage       : string;
    formSet : {
        type        : string;
        name        : string;
        placeHolder : string;
    }[]
}

const FormSubmit : React.FC<FormSubmit> = ({ usage, formSet }) => {

        const { categoryData, getCategory, newCategoryId, newProductId, addProduct, addCategory, isEditProduct, editProductData, updateProduct } = useAuth();

        const [formData, setFormData] = useState<any>(
            formSet.reduce((acc, value) => {
            acc[value.name] = '';
            return acc;
            }, {} as any)
        )

        const handleFormChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {name, value} = e.target
            if(!isEditProduct) {
                setFormData((prevData: any) => ({...prevData, [name]: value, ...(usage === 'product'? {product_id: newProductId} : {category_id: newCategoryId})}))
            } else {
                setFormData((prevData: any) => ({...prevData, [name]: value, ...(usage === 'product'? {product_id: editProductData.product_id} : {category_id: editProductData.category_id})}))
            }
        }
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if(isEditProduct) {
                updateProduct(formData)
            } else {
                if(usage === 'category') {
                    addCategory(formData)
                } else {
                    addProduct(formData)
                }
                setFormData(formSet.reduce((acc, value) => {
                acc[value.name] = '';
                return acc;
                }, {} as any))
                setOpenIcon(false)
                setFormIcon('Pilih Icon')        
            }
        }
    
        const handleClearform = () => {
            setFormData(formSet.reduce((acc, value) => {
            acc[value.name] = '';
            return acc;
            }, {} as any))
            setOpenIcon(false)
            setFormIcon('Pilih Icon')
        }

        const [openIcon, setOpenIcon] = useState<boolean>(false)
        const handleOpenIcon = () => {
            setOpenIcon(!openIcon)
        }

        const [formIcon, setFormIcon] = useState<string>('Pilih Icon')
        const handleChoseIcon = (value: string) => {
            if(!isEditProduct) {
                setFormData((prevData: any) => ({...prevData, product_icon: value, ...(usage === 'product'? {product_id: newProductId} : {category_id: newCategoryId})})) 
            } else {
                setFormData((prevData: any) => ({...prevData, product_icon: value, ...(usage === 'product'? {product_id: editProductData.product_id} : {category_id: newCategoryId})}))
            }
            setFormIcon(value)
        }

        const [selectCategory, setSelectCategory] = useState<string>('')
        const handleChooseCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectCategory(e.target.value)
            if(!isEditProduct) {
                setFormData((prevData: any) => ({...prevData, category_id: e.target.value, ...(usage === 'product'? {product_id: newProductId} : {category_id: newCategoryId})}))
            } else {
                setFormData((prevData: any) => ({...prevData, category_id: e.target.value, ...(usage === 'product'? {product_id: editProductData.product_id} : {category_id: newCategoryId})}))
            }
        }

        useEffect(() => {
            setOpenIcon(false)
        }, [formIcon])
        

        const [icons, setIcons] = useState<string[]>([])

        useEffect(() => {
            getCategory()
            
            async function loadIcons() {
                const modules = import.meta.glob('../assets/product_icons/*.svg', {eager: true, query: 'url', import: 'default'})
                const iconUrls = Object.values(modules) as string[];
                setIcons(iconUrls)
            }
            loadIcons()
        }, [])

        useEffect(() => {
            if(isEditProduct) {
                setFormData(editProductData)
                setSelectCategory(editProductData.category_id)
                setFormIcon(editProductData.product_icon)
            }
        }, [isEditProduct])
        
  return (
    <>
        <form onSubmit={handleSubmit} className='css-input-004'>
            {formSet.map((value, index) => value.type !== 'select'? (
                <input required key={index} type={value.type} className='css-input-005' name={value.name} value={formData[value.name]} placeholder={value.placeHolder} onChange={handleFormChage}></input>
            ):(
                <select required key={index} name={value.name} value={selectCategory} className={`css-input-005-${usage === 'product'? 'true' : 'false'}`} onChange={handleChooseCategory}>
                        <option>Pilih Category</option>
                    {categoryData.map((value, index) => (
                        <option key={index} value={value.category_id}>{value.category_name}</option>
                    ))}
                </select>
            ))}
            <div className={`css-input-013-${usage === 'product'? 'true' : 'false'}`} onClick={handleOpenIcon}>
                <span className='css-input-014'>{formIcon}</span>
                <span><FaAngleDown /></span>
            </div>
            <div className={`css-input-015-${formIcon === 'Pilih Icon'? 'false' : 'true'}`}>
                <img src={formIcon} className='css-input-010'></img>
            </div>
            <div className={`css-input-009-${openIcon && usage === 'product'? 'open' : 'close'}`}>
                {icons.map((value, index) => (
                    <img key={index} src={value} alt={value} className='css-input-010' onClick={() => handleChoseIcon(value)}></img>
                ))}
            </div>
            <div className='css-input-008'>
                <button type='submit' className='css-input-006'>Simpan</button>
                <button type='button' className={`css-input-007-${isEditProduct? 'true' : 'false'}`} onClick={handleClearform}>Hapus</button>
            </div>
        </form>
    </>
  )
}

export default FormSubmit