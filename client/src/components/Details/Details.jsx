import './details.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [state, setState] = useState({});
  //cambiar por videogame y setvideogame
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(response => {
        setState(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container-details">
      <div className="card-details">
        { 
          loading ? <p>Cargando...</p> : (
            error ? <p>El ID ingresado no existe.</p> : (
              <>
                <div className="card-details-image">
                  <img src={state.img}  alt="Imagen del Videojuego" />
                </div>
                <div className="card-details-body">
                  <div className="card-details-close"> 
                    <Link to="/home/" >          
                      <button>x</button>
                    </Link>
                  </div>
                  <div className="card-details-title">
                    <h2>{state.name}</h2>
                  </div>
                  <div className='card-text'>
                    <p>Géneros: <span className="text"> {state.genres.join(', ')} </span></p>
                    <p>Fecha de lanzamiento: <span className="text"> {state.released} </span></p>
                    <p>Rating: <span className="text"> {state.rating} </span></p>
                    <p>Plataformas: <span className="text"> {state.platforms.join(', ')} </span></p>
                    <p>Descripción: <span className="text description"> {state.description} </span></p>
                  </div>
                </div>
              </>
            )
          )
        } 
      </div>
    </div>
  );
}

export default Details;
