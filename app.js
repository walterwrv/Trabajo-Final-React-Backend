import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import externalRoutes from './routes/externalRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

const app = express();

// Middlewares
// app.use(cors());
app.use(cors({ origin: 'https://nodo-cine-frontend.netlify.app/' })); // ✅ habilita solo tu frontend local
app.use(express.json());


// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a Nodo Cine Backend! 🎬');
});

// Rutas reales vendrán después
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);  // Usamos las rutas de perfiles
app.use('/api/movies', movieRoutes);  // Usamos las rutas de movies
app.use('/api/watchlist', watchlistRoutes);  // Usamos las rutas de movies

//Ruta externa
app.use('/api/external', externalRoutes);

export default app;
