import jwt from 'jsonwebtoken';

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  
  const bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(403).json({ message: 'Token no proporcionado o malformado' });
  }

  const token = bearerHeader;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;  // Guardamos los datos del usuario en el objeto request
    next(); // Continúa con la ejecución del siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default verifyToken;
