import Movie from '../models/Movie.js';

// Crear una película
export const createMovie = async (req, res) => {
   
    const { title, description, image, category, releaseDate, ageRating } = req.body;

  try {
    const newMovie = new Movie({ title, description, image, category, releaseDate, ageRating });
    await newMovie.save();
    return res.status(201).json({ message: 'Película creada con éxito', movie: newMovie });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear película', error });
  }
};

// Obtener todas las películas
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener películas', error });
  }
};

//Obtener peliculas con paginado
export const getMoviesPaginado = async (req, res) => {
  try {
    const { title, category, minAge, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (category) filters.category = { $regex: category, $options: 'i' };
    if (minAge) filters.ageRating = { $lte: parseInt(minAge) };

    const movies = await Movie.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(filters);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: movies
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener películas', error });
  }
};


// Obtener una película por ID
export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener película', error });
  }
};

// Editar una película
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, releaseDate, ageRating } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, description, category, releaseDate, ageRating }, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json({ message: 'Película actualizada', movie });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar película', error });
  }
};

// Eliminar una película
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json({ message: 'Película eliminada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar película', error });
  }
};
