import './home.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, getPlatforms } from '../../actions';

import Header from '../Header/Header';
import Filter from '../Filter/Filter';
// import Card from '../Card/Card';
import Paginated from '../Paginated/Paginated';
import Cards from '../Cards/Cards';


const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector ((state) => state.videogamesLoaded);

  // const[ orden, setOrden ] = useState('');

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
  }, [dispatch]) 
  
  useEffect(() => {
    dispatch(getGenres()); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms()); 
  }, [dispatch]);
  
  

  // function handleFilterStatus(e) {
  //   dispatch(filterVideogamesByStatus(e.target.value)) 
  // }

  // function handleFilterCreated(e) {
  //   dispatch(filterCreated(e.target.value)) 
  // }

  // const handleSort = (e) => {
  //   e.preventDefault();
  //   dispatch(orderByName(e.target.value))
  //   setCurrentPage(1);
  //   setOrden('Ordenado ${e.target.value}')
  // }




  return (
    <div>
      <Header />
      <main>
        <Filter 
      
          
        />

        <Cards 
          videoGames={currentVideogames}
        />
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