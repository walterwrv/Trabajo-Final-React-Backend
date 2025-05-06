import axios from 'axios';
import Movie from '../models/Movie.js';

export const searchMoviesFromOMDb = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: 'Debe proporcionar un título' });
  }

  try {
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: title,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }

    res.json(response.data.Search); // lista de películas
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar OMDb', error });
  }
};


export const importMovieFromOMDb = async (req, res) => {
  const { imdbID } = req.body;

  if (!imdbID) {
    return res.status(400).json({ message: 'Debes enviar el imdbID' });
  }

  try {
    // Verificar si ya existe en DB local
    const existing = await Movie.findOne({ imdbID });
    if (existing) {
      return res.status(409).json({ message: 'Película ya existe en la base de datos', movie: existing });
    }

    // Buscar en OMDb
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
      },
    });

    const data = response.data;

    if (data.Response === 'False') {
      return res.status(404).json({ message: 'Película no encontrada en OMDb' });
    }

    // Guardar en MongoDB
    const newMovie = new Movie({
      title: data.Title,
      description: data.Plot,
      category: data.Genre.split(',')[0],
      releaseDate: data.Released !== 'N/A' ? new Date(data.Released) : null,
      ageRating: data.Rated,
      imdbID: data.imdbID,
      image: data.Poster !== 'N/A' ? data.Poster : '', 
    });

    await newMovie.save();

    res.status(201).json({ message: 'Película importada con éxito', movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error al importar película', error });
  }
};

