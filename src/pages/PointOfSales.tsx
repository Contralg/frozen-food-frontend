import { useEffect, useRef, useState } from 'react'
import '../styles/PointOfSales.css'
import PagesButton from '../components/PagesButton'
import Header from '../components/Header'
import DashboardIcon from '../assets/dashboard.svg'
import PosIcon from '../assets/pos.svg'
import StorageIcon from '../assets/storage.svg'
import ReportIcon from '../assets/report.svg'
import DrinkIcon from  '../assets/drinks.svg'
import SearchBar from '../components/SearchBar'
import CategoryButton from '../components/CategoryButton'
import CardProduct from '../components/CardProduct'
import ShoppingCart from '../components/ShoppingCart'
import { FaAngleUp } from "react-icons/fa";
import { useAuth } from '../context/AuthContext'

const PointOfSales = () => {

    const { getProductsData, getCategory, categoryData, filteredProducts, sortTerm } = useAuth()

    const headerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setisVisible] = useState<boolean>(true); 
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentlyVisible = entry.isIntersecting;
                setisVisible(currentlyVisible);
            },
            { threshold: 0.1 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const [cartOpen, setCartOpen] = useState<boolean>(false)

    const handleCartOpen = () => {
        setCartOpen(!cartOpen)
    }

    useEffect(() => {
        getProductsData()
        getCategory()
    }, [])


  return (
    <>
        <div>
            <Header />
        </div>
        <div className='css-pos-005'>
            <div className='css-pos-006'>
                <div ref={headerRef} className='css-pos-001'>
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
                <div className='css-pos-007'>
                    <div className={`css-pos-008-${isVisible ? 'A' : 'B'}`}>
                        <div className='css-pos-002'>
                            <SearchBar />
                        </div>
                        <div className='css-pos-003'>
                            <CategoryButton 
                                text    = {'Semua'}
                                onclick = {''}
                                active  = {sortTerm === ''}
                            />
                            {categoryData.map((value, index) => (
                                <div key={index}>
                                    <CategoryButton 
                                        text    = {value.category_name}
                                        onclick = {value.category_id}
                                        active  = {sortTerm === value.category_id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='css-pos-004'>
                        {filteredProducts.map((value, index) => (
                            <div key={index}>
                                <CardProduct
                                    hidden  = {false}
                                    icon    = {value.product_icon}
                                    name    = {value.product_name}
                                    price   = {value.product_price}
                                    stock   = {value.product_stock}
                                    onclick = {value.product_id} 
                                />
                            </div>
                        ))}
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                        <CardProduct 
                            hidden  = {true}
                            icon    = {DrinkIcon}
                            name    = {'Minuman'}
                            price   = {2500}
                            stock   = {20}
                            onclick = {'minuman'}
                        />
                    </div>
                </div>
            </div>
            <div className={`css-pos-010-${cartOpen? 'open' : 'close'}`}>
                <button className={`css-pos-011-${cartOpen? 'open' : 'close'}`} type='button' onClick={handleCartOpen}><FaAngleUp /></button>
                <ShoppingCart />
            </div>
        </div>
    </>
  )
}

export default PointOfSales