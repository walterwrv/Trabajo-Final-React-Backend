import { Router } from 'express';
import { register, login, getUser, getAllUsers, deleteUserById, updateUserById } from '../controllers/authController.js';
import verifyToken from '../middlewares/auth.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.get('/', verifyToken, checkRole(['admin']), getAllUsers);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteUserById);
router.put('/:id', verifyToken, checkRole(['admin']), updateUserById);



export default router;
