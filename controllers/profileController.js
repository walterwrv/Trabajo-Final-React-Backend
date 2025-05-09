import Profile from '../models/Profile.js';
import Movie from '../models/Movie.js';

// Crear perfil
export const createProfile = async (req, res) => {
  console.log('Usuario autenticado:', req.user);
  try {
    const { name, ageCategory } = req.body;

    if (!req.user || !req.user.userId) {
        return res.status(400).json({ message: 'No se pudo obtener el usuario del token' });
      }
    const { userId } = req.user;

    // Verifica si el usuario existe
 
    const newProfile = new Profile({
      name,
      ageCategory,
      userId: userId, // Asociar el perfil al usuario autenticado
    });

    
  console.log('Nuevo perfil a guardar:', newProfile);
  const savedProfile = await newProfile.save();
  console.log('Perfil guardado:', savedProfile);
  
    res.status(201).json({ message: 'Perfil creado exitosamente', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear perfiiiiil', error });
  }
};

// Obtener todos los perfiles del usuario autenticado
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ userId: req.user.userId });
    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfiles', error });
  }
};

// Obtener un perfil específico
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error });
  }
};

// Actualizar un perfil
export const updateProfile = async (req, res) => {
  try {
    const { name, ageCategory } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { name, ageCategory },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.status(200).json({ message: 'Perfil actualizado', profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error });
  }
};

// Eliminar un perfil
export const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.status(200).json({ message: 'Perfil eliminado', profile: deletedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar perfil', error });
  }
};

// Agregar película a la watchlist
export const addToWatchlist = async (req, res) => {
  const { profileId, movieId } = req.body;

  try {
    const profile = await Profile.findById(profileId);
    const movie = await Movie.findById(movieId);

    if (!profile || !movie) {
      return res.status(404).json({ message: 'Perfil o película no encontrada' });
    }

    // Agregar la película al perfil si no está en la lista
    if (!profile.watchlist.includes(movieId)) {
      profile.watchlist.push(movieId);
      await profile.save();
      return res.status(200).json({ message: 'Película agregada a la watchlist', profile });
    } else {
      return res.status(400).json({ message: 'La película ya está en la watchlist' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar película a la watchlist', error });
  }
};

export const getWatchlist = async (req, res) => {
  const { profileId } = req.params;

  try {
    const profile = await Profile.findById(profileId).populate('watchlist');
    if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

    res.status(200).json(profile.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la watchlist', error });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { profileId, movieId } = req.body;

    if (!profileId || !movieId) {
      return res.status(400).json({ message: 'Faltan datos: profileId o movieId' });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    // Filtrar el movieId del array watchlist
    profile.watchlist = profile.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await profile.save();

    res.status(200).json({ message: 'Película eliminada de la watchlist', watchlist: profile.watchlist });
  } catch (error) {
    console.error('Error al eliminar de la watchlist:', error);
    res.status(500).json({ message: 'Error al eliminar de la watchlist', error });
  }
};

export const clearWatchlist = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    profile.watchlist = []; // Vaciar la watchlist
    await profile.save();

    res.status(200).json({ message: 'Watchlist eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar watchlist:', error);
    res.status(500).json({ message: 'Error al eliminar watchlist', error });
  }
};


