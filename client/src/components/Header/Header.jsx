import './header.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideogames, filterVideogames } from '../../actions';

import logo from '../img/logo.png';
import search from '../img/search.png'

const Header = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genresLoaded);
  const [filterState, setFilterState] = useState({
    genre: 'all',
    origin: 'all',
    sortBy: 'all',
    name: '',
  });

  function handleInputChange(e) {
    e.preventDefault();
    setFilterState({
      ...filterState,
      [e.target.name]: e.target.value,
    });
    dispatch(filterVideogames({
      ...filterState,
      [e.target.name]: e.target.value,
    }));
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(filterVideogames(filterState));
  // }

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
        <img className="logo" height="60" src={logo}  alt="logo" />
      </Link>
      <nav className="navbar">
        <form className="search" action="" method="get">
          <input onChange={(e) => handleInputChange(e)} name="name" type="text" placeholder="Buscar VideoJuegos" />
          {/* <button onClick={(e) => handleSubmit(e)} type="submit"><img src={search}  alt="search" /></button> */}
        </form>
        <NavLink to="/create/" >          
          <button className="create-button">Nuevo VideoJuego</button>
        </NavLink>
      </nav>
    </header>
    <div className="box-filter">
    <div className="filter">
      <select className="filter-button n1" defaultValue={'all'} name="genre" onChange={handleFiltersChange}>
        <option value='all'>Filtrar por Género:</option>
          {
            genres.map((genre) => <option value={genre.name} key={genre.name}>{genre.name}</option>)
          }
      </select>

      <select  className="filter-button n2" defaultValue={'all'} name="origin" onChange={handleFiltersChange}>
        <option value="all">Filtrar por Origen:</option>
        <option value="api">API</option>
        <option value="db">Base de Datos</option>
      </select>

      <select className="filter-button n3" defaultValue={'all'} name="sortBy" onChange={handleFiltersChange}>
        <option value="all">Ordenar por: </option>
        <option value="alpha-asc">Orden Alfabético Ascendente</option>
        <option value="alpha-desc">Orden Alfabético Descendente</option>
        <option value="rating-asc">Rating Ascendente</option>
        <option value="rating-desc">Rating Descendente</option>
      </select>
    </div>
  </div>
  </>);
}

export default Header;

