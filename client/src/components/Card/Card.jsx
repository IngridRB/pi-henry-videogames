import "./card.css";
import React from "react";
import { Link, useHistory } from 'react-router-dom';

// import logo from '../img/logo.png';

const Card = ({ id, img, name, genres }) => {
  
  const history = useHistory();

  return (
    <Link to="/videogame/:id/">
      

    <div className="card-border">
      <div className="card">
        <h3 className="card-title">{ name }</h3>
        {/* {img ? <img className="card-image" src={ img } alt="Imagen referencial del videojuego" /> : ''} */}
        <img className="card-image" src={ img }  alt="logo" onClick={() => history.push(`/vg/${id}/`)}/>
        <p className="card-item">Géneros: <span>{ genres.join(', ') }</span></p>
      </div>
    </div>
    </Link>

  );
};

export default Card;