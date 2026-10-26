import Search2 from '../assets/pic/search.webp';


const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src={Search2} alt="Search-icon" />
        

        <input type="text" placeholder='Search Until You Found...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    </div>
  )
}

export default Search
