import '../styles/SearchBar.css'
import SearchIcon from '../assets/search.svg'
import { useAuth } from '../context/AuthContext'

const SearchBar = () => {

    const { searchProducts } = useAuth()

    const handleSearch = (e: { target: { value: any } }) => {
      searchProducts(e.target.value)
    }

  return (
    <>
        <div className='css-searchbar-001'>
            <img src={SearchIcon} alt='searchIcon' className='css-searchbar-002'/>
            <input type='text' placeholder='Cari Barang disini' className='css-searchbar-003' onChange={handleSearch}/>
        </div>
    </>
  )
}

export default SearchBar