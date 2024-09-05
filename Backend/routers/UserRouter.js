import express from 'express';
import { register, login } from '../controllers/UserController.js';

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

export default router;
