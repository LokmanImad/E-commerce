import express from 'express';
import { ajouterProduitAuPanier } from '../controllers/PanierController.js';
import { authenticateToken } from '../Middlware/Middlware.js';

const router = express.Router();

// Route protégée pour ajouter un produit au panier
router.post('/ajouter', authenticateToken, ajouterProduitAuPanier);



export default router;
