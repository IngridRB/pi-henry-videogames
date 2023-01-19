import './mainPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import imgFondo from '../img/fondo.png';

const MainPage = () => {
  return (
    <div className='container'>
      <div className='mainPage'>
        <h2 className="mainPage-subTitle">Welcome to your</h2>
        <h1 className="mainPage-title">VideoGame List</h1>
        <Link to="/home/">
          <button className="mainPage-button">Let's Go</button>
        </Link>
      </div>
      <div className="box-mainPage-img">
          <img className='mainPage-img' src={imgFondo} alt="Imagen de mando de videojuego" />
      </div>
    </div>
  );
};

export default MainPage;