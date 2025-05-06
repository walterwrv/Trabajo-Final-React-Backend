// routes/externalRoutes.js

import express from 'express';
import { searchMoviesFromOMDb, importMovieFromOMDb } from '../controllers/externalApiController.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', searchMoviesFromOMDb);
router.post('/import', verifyToken, importMovieFromOMDb);

export default router;
