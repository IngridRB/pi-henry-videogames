import './header.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideogames, filterVideogames, setLoading } from '../../actions';

import logo from '../img/logo.png';
import imageSearch from '../img/search.png'

const Header = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genresLoaded);
  const [filterState, setFilterState] = useState({
    genre: 'all',
    origin: 'all',
    sortBy: 'all',
  });
  const [ searchName, setSearchName ] = useState ('');

  function handleSubmit(e) {
    e.preventDefault(e)
    dispatch(setLoading(true));
    dispatch(searchVideogames(searchName));
    setFilterState({
      genre: 'all',
      origin: 'all',
      sortBy: 'all',
    });
  }

  function handleInputChange(e) {
    e.preventDefault();
    setSearchName(e.target.value);
  }

  function handleFiltersChange(e) {
    setFilterState({
      ...filterState,
      [e.target.name]: e.target.value,
    });
    dispatch(filterVideogames({
      ...filterState,
      [e.target.name]: e.target.value,
    }));
  }

  return (<>
    <header className="box-header">
      <Link to="/" >         
        <img className="logo" height="60" src={ logo } alt="logo"/>
      </Link>
      <nav className="navbar">
        <form className="search" action="" method="get" onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => handleInputChange(e)} name="name" type="text" placeholder="Buscar VideoJuegos"/>
          <button type="submit"><img src={ imageSearch } alt="search"/></button>
        </form>
        <NavLink to="/create/" >          
          <button className="create-button">Nuevo VideoJuego</button>
        </NavLink>
      </nav>
    </header>
    <div className="box-filter">
    <div className="filter">
      <select className="filter-button n1" value={filterState.genre} name="genre" onChange={handleFiltersChange}>
        <option value='all'>Filtrar por G??nero:</option>
          {
            genres.map((genre) => <option value={genre.name} key={genre.name}>{genre.name}</option>)
          }
      </select>
      <select  className="filter-button n2" value={filterState.origin} name="origin" onChange={handleFiltersChange}>
        <option value="all">Filtrar por Origen:</option>
        <option value="api">API</option>
        <option value="db">Base de Datos</option>
      </select>

      <select className="filter-button n3" value={filterState.sortBy} name="sortBy" onChange={handleFiltersChange}>
        <option value="all">Ordenar por: </option>
        <option value="alpha-asc">Orden Alfab??tico Ascendente</option>
        <option value="alpha-desc">Orden Alfab??tico Descendente</option>
        <option value="rating-asc">Rating Ascendente</option>
        <option value="rating-desc">Rating Descendente</option>
      </select>
    </div>
  </div>
  </>);
}

export default Header;