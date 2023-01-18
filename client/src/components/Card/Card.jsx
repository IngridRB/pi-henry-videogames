import "./card.css";
import React from "react";
import { useHistory} from 'react-router-dom';

const Card = ({ id, img, name, genres, rating }) => {
  
  const history = useHistory();
  const num = Math.round(rating);
  // const starEmoji = "⭐️";
  let stars = "";
  for (let i = 0; i < num; i++) {
    stars += "⭐️";
  }

  return (
    <div className="card-border">
      <div className="card" onClick={() => history.push(`/videogame/${id}/`)}>
        <h3 className="card-title">{ name }</h3>
        {img ? <img className="card-image" src={ img } alt="Imagen referencial del videojuego"/> : ''}
        <p className="card-item">Géneros: <span>{ genres.join(', ') }</span></p>
        <p>{stars}</p> 
        {/* <p className="card-item">{Math.round(rating)}</p> */}
        {/* <p className="card-item">{rating}</p> */}
      </div>
    </div>
  );
};

export default Card;