import './details.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const [videogame, setVideogame] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(response => {
        setVideogame(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        setTimeout(() => {
          history.push('/home');
        }, 2000);
      });
  }, [id, history]);

  const integerRating = Math.round(videogame.rating);
  let starsRating = "";
  for (let i = 0; i < integerRating; i++) {
    starsRating += "⭐️";
  }

  return (
    <div className="container-details">
      { 
        loading ? <p className='error-text'>Cargando...</p> : (
          error ? <p className='error-text' >El ID ingresado no existe.</p> : (
            <div className="card-details">
              {videogame.img ? 
                <div className="card-details-image">
                  <img src={ videogame.img } alt="Imagen del Videojuego"/>
                </div> : ''}
              <div className={`card-details-body ${videogame.img ? '' : 'card-details-body-100'}`}>
                <div className="card-details-close"> 
                  <Link to="/home/" >          
                    <button>x</button>
                  </Link>
                </div>
                <div className="card-details-title">
                  <h2>{ videogame.name }</h2>
                </div>
                <div className='card-text'>
                  <p>Géneros: <span className="text">{ videogame.genres.join(', ') }</span></p>
                  <p>Fecha de lanzamiento: <span className="text">{ videogame.released }</span></p>
                  <p>Rating: <span className="text">{ starsRating } ({ videogame.rating })</span></p> 
                  <p>Plataformas: <span className="text">{ videogame.platforms.join(', ') }</span></p>
                  <p>Descripción:
                    <span
                      className="text description"
                      dangerouslySetInnerHTML={{__html: videogame.description}}
                    ></span>
                  </p>
                </div>
              </div>
            </div>
          )
        )
      } 
    </div>
  );
}

export default Details;