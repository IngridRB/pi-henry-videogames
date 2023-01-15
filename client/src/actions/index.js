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

export function getNameVideogames(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get (`http://localhost:3001/videogames?name=${name}`);
      return dispatch ({
        type: 'GET_NAME_VIDEOGAMES',
        payload: json.data
      })
    } catch (error) {
      console.log(error);
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

export function postVideogames(payload) {
  return async function(dispatch){
    const response = await axios.post('http://localhost:3001/videogames', payload);
    console.log(response)
    return response;
  }
}

export function getVideogamesDetails (id) {
  return async function(dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch ({
        type: 'GET_VIDEOGAMES_DETAILS',
        payload: json.data
      })
    } catch(error) {
      console.log(error);
    }
  }
}

// export function filterVideogamesByStatus(payload) {
//   return {
//     type: 'FILTER_BY_STATUS',
//     payload
//   }
// }
// export function filterCreated(payload) {
//   return {
//     type: 'FILTER_CREATED',
//     payload
//   }
// }

// export function orderByName(payload) {
//   return {
//     type: 'ORDER_BY_NAME',
//     payload
//   }
// }
