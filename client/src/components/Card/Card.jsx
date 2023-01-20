import "./card.css";
import React from "react";
import { useHistory } from 'react-router-dom';

const Card = ({ id, img, name, genres, rating }) => { 
  const history = useHistory();

  const integerRating = Math.round(rating);
  let starsRating = "";
  for (let i = 1; i <= integerRating; i++) {
    starsRating += "⭐️";
  }

  return (
    <div className="card-border">
      <div className="card" onClick={() => history.push(`/videogame/${id}/`)}>
        <h3 className="card-title">{ name }</h3>
        {img ? <img className="card-image" src={ img } alt="Imagen referencial del videojuego"/> : ''}

        { genres.length !== 0 ? 
            <p className="card-item">Géneros: <span>{ genres.join(', ') }</span></p> : ''}
        {/* <p className="card-item">Géneros: <span>{ genres.join(', ') }</span></p> */}
        { Math.round(rating) ? 
            <p className="card-item-stars">{ starsRating }</p>  : 
            <p className="card-item zeroRating"><span>{ rating }</span></p> 
        }
        {/* <p>{ starsRating }</p>  */}

        {/* <p className="card-item">{Math.round(rating)}</p> */}
        {/* <p className="card-item">{rating}</p> */}
      </div>
    </div>
  );
};

export default Card;