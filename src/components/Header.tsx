import '../styles/Header.css'
import store from '../assets/store.svg'


const Header = () => {


  return (
    <>
        <div className='css-header-001'>
            <div className='css-header-004'>
                <img src={store} className='css-header-002'></img>
                <div className='css-header-003'>Frozen Food</div>
            </div>
            <div className='css-header-005'>Aplikasi Toko Untuk Retail Modern</div>
        </div>
    </>
  )
}

export default Header