// middleware/checkRole.js
export function checkRole(allowedRoles) {
    return (req, res, next) => {
      try {
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'No autorizado para esta acción' });
        }
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error al verificar rol', error });
      }
    };
  }
  