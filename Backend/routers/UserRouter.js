import express from 'express';
import { register, login , updateProfile } from '../controllers/UserController.js';

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

router.put('/modi/:id', updateProfile);

export default router;
