const initialState = {
  videogamesLoaded : [],
  allVideogames: [],
  
  filteredVideogames: [],

  genresLoaded: [],
  platformsLoaded: [],
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
        allVideogames: action.payload,
        platformsLoaded: [...new Set(platforms)],
      };
    case 'GET_NAME_VIDEOGAMES':
      return {
        ...state,
        videogamesLoaded: action.payload,
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

    // case 'GET_VIDEOGAMES_DETAILS':
    //   return {
    //     ...state,
    //     videogameDetail: action.payload,
    //   }
    
    case 'FILTER_VIDEOGAMES':
      const filteredVideogames = state.videogamesLoaded.filter((videogame) => {
        return (
          (action.payload.genre === 'all' || videogame.genres?.includes(action.payload.genre)) &&
          (action.payload.origin === 'all' || videogame.source === action.payload.origin)
        );
      }).sort(
        (videogameA, videogameB) => {
          if (action.payload.sortBy === 'rating-asc' || action.payload.sortBy === 'rating-desc') {
            // parseInt(videogameA.rating) - parseInt(videogameB.rating)
            const ratingA = videogameA.rating;
            const ratingB = videogameB.rating;
            return action.payload.sortBy === 'rating-asc' ? (
              parseInt(ratingA) - parseInt(ratingB)
            ) : (
              parseInt(ratingB) - parseInt(ratingA)
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

      // case 'FILTER_BY_STATUS':
      //   const allVideogames = state.allVideogames;
      //   const statusFiltered = action.payload === 'all' ? allVideogames : allVideogames.filter(el => el.state === action.payload);
      //   return {
      //     ...state,
      //     videogamesLoaded: statusFiltered

      //   }
      //   case 'FILTER_CREATED':
      //   const statusFiltered2 = action.payload === 'db' ? state.allVideogames.filter(el => el.createdInDb) :
      //   state.allVideogames.filter(el => !el.createdInDb);
      //   return {
      //     ...state,
      //     videogamesLoaded: action.payload === 'all' ? state.allVideogames : statusFiltered2
      //   }
        // case 'ORDER_BY_NAME':
        //   let sortedArr = action.payload === 'asc' ?
        //     state.videogamesLoaded.sort(function (a, b) {
        //       if(a.name > b.name) {
        //         return 1;
        //       }
        //       if(b.name > a.name) {
        //         return -1;
        //       }
        //       return 0;
        //     }) :
        //     state.videogamesLoaded.sort(function (a, b) {
        //       if(a.name > b.name) {
        //         return -1;
        //       }
        //       if(b.name > a.name) {
        //         return 1;
        //       }
        //       return 0;
        //     })
        // return {
        //   ...state,
        // videogamesLoaded: sortedArr
        // }



        
      default:
        return state;
  }
}
export default rootReducer;