import express from 'express';
import verifyToken from '../middlewares/auth.js';
import { checkRole } from '../middlewares/checkRole.js';
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie, 
getMoviesPaginado } from '../controllers/movieController.js';

const router = express.Router();

// Rutas para el CRUD de movies
// Rutas protegidas por token
router.post('/create', verifyToken, checkRole(['admin']), createMovie);
router.get('/', getMovies);
router.get('/paginado',verifyToken, getMoviesPaginado);
router.get('/:id', getMovieById);
router.put('/:id', verifyToken, checkRole(['admin']), updateMovie);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteMovie);


export default router;
