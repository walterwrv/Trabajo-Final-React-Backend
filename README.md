# 🎬 NodoCine - Backend

Este es el backend de NodoCine, una plataforma de películas con autenticación, gestión de usuarios, perfiles, catálogo, watchlist y más.

## 🔧 Requisitos

- Node.js
- MongoDB (MongoDB Atlas)
- .env configurado (ver más abajo)

## 📦 Instalación

1. Cloná el repositorio si no lo hiciste:

   git clone https://github.com/walterwrv/Trabajo-Final-React-Backend
   cd Trabajo-Final-React-Backend

2. Instalá las dependencias:

   npm install

3. Configurá el archivo `.env` (Pregunta al admin los datos a cargar en estas variables):

   Creá un archivo `.env` en la raíz del backend y agregá:

   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nodocine
   JWT_SECRET=tu_clave_secreta

4. Iniciá el servidor:

   npm run dev

   El servidor quedará corriendo en `http://localhost:5000`.

5. Url de apweb service subido en render:

   https://trabajo-final-react-backend.onrender.com

## 🚀 Funcionalidades

- Autenticación con JWT
- CRUD de usuarios, perfiles y películas
- Watchlist por perfil
- Filtro por edad y paginación
- Importación desde OMDb API
