const axios = require('axios');
const { Videogame, Genre } = require('../db');

const getVideogamesFromApi = async () => {
  let videogames = [];
  for (let i = 1; i <= 5; i++) {
    const apiResults = await axios({
      method: 'get',
      url: `https://api.rawg.io/api/games?key=5b11753fb582487198394d84f504ed42&page=${i}`,
      headers: { "Accept-Encoding": "null" }
    });
    apiResults.data.results?.forEach(el => {
      videogames.push({
        id: el.id,
        name: el.name,
        img: el.background_image,
        genres: el.genres.map(genre => genre.name),
        released: el.released,
        rating: el.rating,
        platforms: el.platforms.map(el => el.platform.name),
      })
    });
  }
  return videogames;
};

const getVideogamesFromDb = async () => {
  const videogames = await Videogame.findAll({
    include:{
      model: Genre,
      attributes: ['name'],
    },
  });
  return videogames;
}

const getAllVideogames = async () => {
  const videogamesFromApi = await getVideogamesFromApi();
  const videogamesFromDb = await getVideogamesFromDb();
  const allVideogames = videogamesFromApi.concat(
    videogamesFromDb.map(videogame => {
      videogame = videogame.get({ plain: true }); // por la relación circular
      return {
        ...videogame,
        genres: videogame.genres.map(genre => genre.name),
        platforms: videogame.platforms.split(','),
      };
    })
  );
  return allVideogames;
}

const searchVideogamesFromApi = async (searchTerm) => {
  const wantedVideogames = await axios.get(
    `https://api.rawg.io/api/games?key=5b11753fb582487198394d84f504ed42&search=${searchTerm}`
  );
  return wantedVideogames.data.results.map(videogame => {
    return {
      id: videogame.id,
      name: videogame.name,
      img: videogame.background_image,
      genres: videogame.genres.map(genre => genre.name),
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms?.map(el => el.platform.name) || [],
    };
  });
};

const searchAllVideogames = async (name) => {
  const videogamesFromApi = await searchVideogamesFromApi(name);
  const videogamesFromDb = await getVideogamesFromDb();
  const allVideogames = videogamesFromApi.concat(
    videogamesFromDb.filter(videogame => {
      return videogame.name.toLowerCase().includes(name.toLowerCase())
    }).map(videogame => {
      videogame = videogame.get({ plain: true });
      return {
        ...videogame,
        genres: videogame.genres.map(genre => genre.name),
        platforms: videogame.platforms.split(','),
      };
    })
  );
  return allVideogames;
}

module.exports = { getVideogamesFromApi, getVideogamesFromDb, getAllVideogames, searchVideogamesFromApi, searchAllVideogames }