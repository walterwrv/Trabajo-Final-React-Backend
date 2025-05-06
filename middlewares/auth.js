import jwt from 'jsonwebtoken';

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  // console.log('Authorization header:', req.headers.authorization);

  const bearerHeader = req.headers['authorization'];
  
  // console.log('bearerHeader:', bearerHeader.startsWith('Bearer '));

  if (!bearerHeader) {
    return res.status(403).json({ message: 'Token no proporcionado o malformado' });
  }

  // const token = bearerHeader.split(' ')[0]; // Extrae solo el token
  const token = bearerHeader;

  try {
    // console.log('JWT_SECRET:', process.env.JWT_SECRET);
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded Token:', decoded);
    req.user = decoded;  // Guardamos los datos del usuario en el objeto request
    next(); // Continúa con la ejecución del siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default verifyToken;
