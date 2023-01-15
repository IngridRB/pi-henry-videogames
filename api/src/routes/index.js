const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Videogame, Genre } = require ('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getVideogamesFromApi = async () => {

  // const apiUrl = await axios.get('https://api.rawg.io/api/games?key=5b11753fb582487198394d84f504ed42');
  // const apiInfo = await apiUrl.data.results.map(el => {
  //   return {
  //     id: el.id,
  //     name: el.name,
  //     img: el.background_image,
  //     genres: el.genres.map(genre => genre.name),
  //     released: el.released,
  //     rating: el.rating,
  //     platforms: el.platforms.map(el => el.platform.name),
  //     description: el.description,
  //   };
  // });
  // return apiInfo;


  let apiInfo = [];
  for (let i = 1; i <= 5; i++) {
    const apiUrl = await axios({
      method: 'get',
      url: `https://api.rawg.io/api/games?key=5b11753fb582487198394d84f504ed42&pages=${i}`,
      headers: { "Accept-Encoding": "null" }
    });
    apiUrl.data.results?.map(el => {
      apiInfo.push({
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
  return apiInfo;
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

router.get('/videogames', async (req, res) => {
  const { name } = req.query;
  let videogamesTotal = await getAllVideogames();
  if (name) {
    let videogameName = await videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    videogameName.length ?
    res.status(200).send(videogameName) :
    res.status(404).send('no hay');
  } else {
    res.status(200).send(videogamesTotal)
  }
})

router.get('/genres', async (req, res) => {
  const genresApi = await axios.get('https://api.rawg.io/api/genres?key=5b11753fb582487198394d84f504ed42');
  const genres = await genresApi.data.results.map(el => el.name);
  genres.forEach(el => {
    Genre.findOrCreate({
      where: { name: el }
    })
  })
  
  const allGenres = await Genre.findAll();
  res.send(allGenres);
})

router.post('/videogames', async (req, res) => {
  let {
    name,
    released,
    rating,
    description,
    platforms,
    createdInDb,
    genres,
  } = req.body

  let videogameCreated = await Videogame.create ({
    name,
    released,
    rating,
    description,
    platforms,
    createdInDb
  });
  genres.forEach(async (genre) => {
    let genreDb = await Genre.findAll({
      where: { name: genre }
    });
    videogameCreated.addGenre(genreDb);
  });
  res.send('Videojuego creado con exito');
});


router.get('/videogame/:id', async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const videogamesFromDb = await getVideogamesFromDb();
      let videogameFromDb = await videogamesFromDb.find(el => el.id == id)
      if (videogameFromDb) {
        videogameFromDb = videogameFromDb.get({ plain: true });
        res.status(200).json({
          ...videogameFromDb,
          genres: videogameFromDb.genres.map(genre => genre.name),
          platforms: videogameFromDb.platforms.split(','),
        });
        return;
      }

      let videogameFromApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=5b11753fb582487198394d84f504ed42`);
      if (videogameFromApi.data.id == id) {  
        res.status(200).json({
          id: videogameFromApi.data.id,
          name: videogameFromApi.data.name,
          img: videogameFromApi.data.background_image,
          genres: videogameFromApi.data.genres.map(genre => genre.name),
          released: videogameFromApi.data.released,
          rating: videogameFromApi.data.rating,
          platforms: videogameFromApi.data.platforms.map(el => el.platform.name),
          description: videogameFromApi.data.description,
        });
      } else {
        res.status(404).send('No encontré el videojuego');
      }
    } catch (e) {
      res.status(404).send('No encontré el videojuego');
    }   
  } else {
    res.status(404).send('No encontré el videojuego');
  }
})

module.exports = router;
