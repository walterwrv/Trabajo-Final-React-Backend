import express from 'express';
import verifyToken from '../middlewares/auth.js';
import { createProfile, getProfiles, getProfile, updateProfile, deleteProfile, addToWatchlist, clearWatchlist } from '../controllers/profileController.js';

const router = express.Router();

// Rutas para el CRUD de perfiles
router.post('/create', verifyToken, createProfile); // Crear perfil
router.get('/all', verifyToken, getProfiles); // Obtener todos los perfiles
router.get('/:id', verifyToken, getProfile); // Obtener perfil por ID
router.put('/:id', verifyToken, updateProfile); // Actualizar perfil
router.delete('/:id', verifyToken, deleteProfile); // Eliminar perfil
router.post('/watchlist', verifyToken, addToWatchlist); // Agregar movie a watchlist por perfil
router.delete('/:profileId/watchlist', verifyToken, clearWatchlist);

export default router;
