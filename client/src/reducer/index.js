const initialState = {
  videogamesLoaded : [],
  filteredVideogames: [],
  genresLoaded: [],
  platformsLoaded: [],
  isLoading: true,
}

function rootReducer (state = initialState, action) {
  switch(action.type) {

    case 'GET_VIDEOGAMES':
      const videogames = action.payload;
      const platforms = [];  
      videogames.forEach(videogame => {
        videogame.platforms.forEach(platform => {
          platforms.push(platform);
        });
      });
      return {
        ...state,
        videogamesLoaded: action.payload,
        filteredVideogames: action.payload,
        platformsLoaded: [...new Set(platforms)],
        isLoading: false,
      };

    case 'SEARCH_VIDEOGAMES':
      return {
        ...state,
        videogamesLoaded: action.payload,
        filteredVideogames: action.payload,
        isLoading: false,
      }

    case 'GET_GENRES':
      return {
        ...state,
        genresLoaded: action.payload,
      }

    case 'POST_VIDEOGAMES':
      return {
        ...state,
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    
    case 'FILTER_VIDEOGAMES':
      const filteredVideogames = state.videogamesLoaded.filter((videogame) => {
        
        return (
          (action.payload.genre === 'all' || videogame.genres.includes(action.payload.genre)) &&
          (
            action.payload.origin === 'all' ||
            (action.payload.origin === 'api' && !videogame.createdInDb) ||
            (action.payload.origin === 'db' && videogame.createdInDb)
          )
        );
      }).sort(
        (videogameA, videogameB) => {
          if (action.payload.sortBy === 'rating-asc' || action.payload.sortBy === 'rating-desc') {
            const ratingA = videogameA.rating;
            const ratingB = videogameB.rating;
            return action.payload.sortBy === 'rating-asc' ? (
              parseFloat(ratingA) - parseFloat(ratingB)
            ) : (
              parseFloat(ratingB) - parseFloat(ratingA)
            );
          }
          if (action.payload.sortBy === 'alpha-asc' || action.payload.sortBy === 'alpha-desc') {
            return action.payload.sortBy === 'alpha-asc' ? (
              videogameA.name.localeCompare(videogameB.name)
            ) : (
              videogameB.name.localeCompare(videogameA.name)
            );
          }
          return 0;
        }
      );
      return {
        ...state,
        filteredVideogames,
      };
   
    default:
      return state;
  }
}
export default rootReducer;