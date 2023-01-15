import './header.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../../actions';

import logo from '../img/logo.png';
import search from '../img/search.png'

const Header = () => {
  const dispatch = useDispatch();
  const [ name, setName ] = useState("")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameVideogames(name))
  }

  return (
    <header className="box-header">
      <Link to="/" >         
        <img className="logo" height="60" src={logo}  alt="logo" />
      </Link>
      <nav className="navbar">
        <form className="search" action="" method="get">
          <input onChange={(e) => handleInputChange(e)} type="text" placeholder="Buscar VideoJuegos" />
          <button onClick={(e) => handleSubmit(e)} type="submit"><img src={search}  alt="search" /></button>
        </form>
        <NavLink to="/create/" >          
          <button className="create-button">Nuevo VideoJuego</button>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;

