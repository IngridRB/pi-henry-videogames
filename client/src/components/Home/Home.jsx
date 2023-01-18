import './home.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, getPlatforms } from '../../actions';

import Header from '../Header/Header';
import Paginated from '../Paginated/Paginated';
import Cards from '../Cards/Cards';


const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector ((state) => state.filteredVideogames);
  const loading = useSelector(state => state.loading);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ videogamesPerPage, setVideogamesPerPage ] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect (() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className='main'>
        {loading ? <p className='main-text'>Cargando...</p> :  
          (
            currentVideogames.length === 0 ?
            <p className='main-text'>No hay juegos!</p> : 
            <Cards 
              videoGames={currentVideogames}
            />
          )
        }
      </main>
      <footer>
        <Paginated 
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          changeCurrentPage = {changeCurrentPage}
        />
      </footer>
    </div>
  );
};

export default Home;