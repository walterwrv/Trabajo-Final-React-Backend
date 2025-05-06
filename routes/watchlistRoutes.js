import express from 'express';
import verifyToken from '../middlewares/auth.js';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/profileController.js';

const router = express.Router();

// Rutas para el CRUD de perfiles

router.post('/add', verifyToken, addToWatchlist); // Agregar movie a watchlist por perfil
// routes/watchlist.js
router.get('/:profileId', verifyToken, getWatchlist);
router.post('/remove', verifyToken, removeFromWatchlist);



export default router;
