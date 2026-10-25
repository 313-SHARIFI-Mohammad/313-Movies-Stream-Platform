import { useState, useEffect } from 'react'
import Background from './assets/Pic/Background.png'
import Search from './Components/Search'
import Hero from './assets/Pic/Epic Movie Poster Trilogy.png';
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';
import { useDebounce } from 'react-use';
import LOGO from './assets/Pic/LOGO.png'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')


  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('');

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === 'false') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMoviesList([]);
        return;

      }

      setMoviesList(data.results || [])
      


    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage('Error fetching movies: pleas try again later')
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])
  
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#020817',
        color: 'white',
      }}
    >
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img className='w-auto h-20 mb-20' src={LOGO} alt="LOGO-Platform" />
          <h1>
            <img src={Hero} alt="" />
            Find <span className="text-gradient">Movies</span>
            <br />
            That You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>


      <section className='all-movies'>
        <h2 className='mt-20'>
          All Movies
        </h2>
        {isLoading ? (
          <Spinner />
        ): errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ): (
          <ul>
            {moviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>

      </div>
    </main>
  )
}

export default App