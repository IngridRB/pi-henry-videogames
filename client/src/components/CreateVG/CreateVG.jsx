import './createVG.css'
import React from 'react';
import { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames } from '../../actions';

function validate(inputState) {
  const errors = {};
  
  const nameValidation = validateName(inputState.name);
  if (nameValidation !== '') {
    errors.name = nameValidation;
  }

  const releasedValidation = validateReleased(inputState.released);
  if (releasedValidation !== '') {
    errors.released = releasedValidation;
  }

  const ratingValidation = validateRating(inputState.rating);
  if (ratingValidation !== '') {
    errors.rating = ratingValidation;
  }

  const descriptionValidation = validateDescription(inputState.description);
  if (descriptionValidation !== '') {
    errors.description = descriptionValidation;
  }

  const genresValidation = validateGenres(inputState.genres);
  if (genresValidation !== '') {
    errors.genres = genresValidation;
  }

  const platformsValidation = validatePlatforms(inputState.platforms);
  if (platformsValidation !== '') {
    errors.platforms = platformsValidation;
  }

  return errors;
};

function validateName(name) {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return 'Debes ingresar un nombre.';
  }
  if (trimmed.length > 100) {
    return 'El nombre no puede tener más de 100 caracteres.';
  }
  return '';
}

function validateReleased(released) {
  const startDate = new Date('1950-01-01');
  const endDate = new Date();
  const releaseDate = new Date(released);
  if (releaseDate >= startDate && releaseDate <= endDate) {
    return '';
  }
  return 'La fecha de lanzamiento debe ser entre el 01/01/1950 y el mes presente.';
}

function validateRating(rating) {
  const trimmed = rating.trim();
  if (trimmed.length === 0) {
    return 'Debes ingresar un rating.';
  }
  if (isNaN(trimmed)) {
    return 'El rating debe ser un número.';
  }
  
  const number = parseFloat(trimmed);
  if (number % 1 !== 0) {
    return 'El rating debe ser un número entero.'
  }
  if (number > 5 || number < 0) {
    return 'El rating debe estar entre 0 y 5.';
  }
  return '';
}

function validateDescription(description) {
  const trimmed = description.trim();
  if (trimmed.length === 0) {
    return 'Debes ingresar una descripción del videojuego.';
  }
  if (trimmed.length < 50) {
    return 'La descripción no puede tener menos de 50 caracteres.';
  }
  if (trimmed.length > 500) {
    return 'La descripción no puede tener más de 500 caracteres.';
  }
  return '';
}

function validateGenres(selectedGenres) {
  if (selectedGenres.length === 0) {
    return 'Debes seleccionar al menos un género.';
  }
  return '';
}

function validatePlatforms(selectedPlatforms) {
  if (selectedPlatforms.length === 0) {
    return 'Debes seleccionar al menos una plataforma.';
  }
  return '';
}

const CreateVG = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genresLoaded);
  const platforms = useSelector((state) => state.platformsLoaded);

  const [errors, setErrors] = useState({
    name: 'Debes ingresar un nombre.',
    released: 'Debes ingresar una fecha de lanzamiento.',
    rating: 'Debes ingresar un rating.',
    description: 'Debes ingresar una descripción.',
    genres: 'Debes seleccionar al menos un género',
    platforms: 'Debes seleccionar al menos una plataforma',
  });
  // const [success, setSuccess] = useState(false);
  
  const [ inputState, setInputState ] = useState({
    name: '',
    released: '',
    rating: '',
    description: '',
    genres: [],
    platforms: [],
  });

  function handleChange(e) {
    setInputState({
      ...inputState,
      [e.target.name] : e.target.value 
    });
    setErrors(validate({
      ...inputState,
      [e.target.name] : e.target.value 
    }));
  }

  function handleSelectGenres(e) {
    const selectElement = e.target;
    const selectedGenres = [...selectElement.querySelectorAll('option')].filter(
      (optionElement) => optionElement.selected
    ).map(optionElement => optionElement.value);
    setInputState({
      ...inputState,
      genres: selectedGenres,
    });
    setErrors(validate({
      ...inputState,
      genres: selectedGenres,
    }));
  }

  function handleSelectPlatforms(e) {
    const selectElement = e.target;
    const selectedPlatforms = [...selectElement.querySelectorAll('option')].filter(
      (optionElement) => optionElement.selected
    ).map(optionElement => optionElement.value);
    setInputState({
      ...inputState,
      platforms: selectedPlatforms,
    });
    setErrors(validate({
      ...inputState,
      platforms: selectedPlatforms,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postVideogames({
      name: inputState.name.trim(),
      released: inputState.released,
      rating: parseInt(inputState.rating.trim()),
      description: inputState.description.trim(),
      platforms: inputState.platforms.join(','),
      genres: inputState.genres,
    }))
    alert("Videojuego creado!!");
    history.push('/home');
  }

  return (
    <div className="container-createVG">

      <div className="createVG">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className="createVG-title">Crear un VideoJuego</h2>
          <div>
            <div className="createVG-input">
              <label>Nombre: </label>
              <input type="text" name="name" placeholder="Nombre del VideoJuego" onChange={handleChange}/>
              {errors.name && (
                <p className='input-error'>{errors.name}</p>
              )}
            </div>
            <div className="createVG-input">
              <label>Fecha de lanzamiento: </label>
              <input className='input-date' type="date" name="released" onChange={handleChange}/>
              {errors.released && (
                <p className='input-error'>{errors.released}</p>
              )}
            </div>
            <div className="createVG-input">
              <label>Rating: </label>
              <input type="text"  name="rating" placeholder="Rating (1 - 5)"  onChange={handleChange}/>
              {errors.rating && (
                <p className='input-error'>{errors.rating}</p>
              )}
            </div>
            <div className="createVG-input">
              <label>Descripción: </label>
              <textarea type="text" name="description" rows="2"  placeholder="Ingresa la descripción del VideoJuego" onChange={handleChange}></textarea>
              {errors.description && (
                <p className='input-error'>{errors.description}</p>
              )}
            </div>
            
            <div className="createVG-input">
              <label>Géneros: </label>
              <select name="genre" multiple onChange={handleSelectGenres}>
                {
                  genres.map((genre) => <option value={genre.name} key={genre.name}>{genre.name}</option>)
                }
              </select>
              {errors.genres && (
                <p className='input-error'>{errors.genres}</p>
              )}
              {
                inputState.genres ? <p className='selected'>{ inputState.genres.join(', ') }</p> : ''
              }
            </div>

            <div className="createVG-input">
              <label>Plataformas: </label>
              <select className="" name="platforms" onChange={handleSelectPlatforms} multiple >
                {
                  platforms.map((platform) => <option value={platform} key={platform}>{platform}</option>)
                }
              </select>
              {errors.platforms && (
                <p className='input-error'>{errors.platforms}</p>
              )}
              {
                inputState.platforms ? <p className='selected'>{ inputState.platforms.join(', ') }</p> : ''
              }
            </div>

            <div  className="createVG-buttons">
              <Link to="/home" >         
                <button type="" className="createVG-button">Cancelar</button>
              </Link>
              {
                (Object.keys(errors).length === 0) ?
                  <button type="submit" className="createVG-button">Crear VideoJuego</button> :
                  ''
              }
            </div>
            
            {/* {success && <p className="success-message">Videojuego creado exitosamente</p>} */}
          </div>
        </form>
      </div>
        
    </div>
  )
}

export default CreateVG;