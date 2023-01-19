import axios from 'axios';

export function getVideogames() {
  return async function(dispatch) {
    const json = await axios.get ('http://localhost:3001/videogames', {
    });
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: json.data
    })
  }
}

export function searchVideogames(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get (`http://localhost:3001/videogames?name=${name}`);
      return dispatch ({
        type: 'SEARCH_VIDEOGAMES',
        payload: json.data
      })
    } catch {
      return dispatch ({
        type: 'SEARCH_VIDEOGAMES',
        payload: [],
      });
    }
  }
}

export function getGenres() {
  return async function(dispatch) {
    const json = await axios.get ('http://localhost:3001/genres', {
    });
    return dispatch({
      type: 'GET_GENRES',
      payload: json.data
    })
  }
}

export function getPlatforms() {
  return {
    type: 'GET_PLATFORMS',
  };
}

export function setLoading(isLoading) {
  return {
    type: 'SET_LOADING',
    payload: isLoading,
  };
}

export function postVideogames(payload) {
  return async function(dispatch){
    const response = await axios.post('http://localhost:3001/videogames', payload);
    return response;
  }
}

export function filterVideogames({genre, origin, sortBy}) {
  return {
    type: "FILTER_VIDEOGAMES",
    payload: {
      genre,
      origin,
      sortBy,
    }
  };
}