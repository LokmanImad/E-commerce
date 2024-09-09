import express from 'express';
import Produit from '../models/Produit.js'
import mongoose from 'mongoose';
import { ajouterProduit, modifierProduit, supprimerProduit , getAllProduits , getProduitById  } from '../controllers/ProduitController.js';

const router = express.Router();


// Get a product by ID
router.get('/productDetails/:id', getProduitById);
// Route to get all product 
router.get('/', getAllProduits);
// Route to add a product
router.post('/ajouter', ajouterProduit);

// Route to update a product
router.put('/modifier/:id', modifierProduit);

// Route to delete a product
router.delete('/supprimer/:id', supprimerProduit);

// Exemple d'API backend avec message d'erreur
router.get('/par-ids', async (req, res) => {
    const { ids } = req.query;
  
    if (!ids) {
      return res.status(400).json({ message: 'Aucun ID fourni' });
    }
  
    try {
      // Convertir les IDs en ObjectId avec 'new mongoose.Types.ObjectId()'
      const idsArray = ids.split(',').map(id => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch (error) {
          console.error(`Format d'ID invalide : ${id}`);
          return null;
        }
      }).filter(id => id !== null); // Supprimer les IDs invalides
  
      const produits = await Produit.find({ _id: { $in: idsArray } });
      if (produits.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé' });
      }
      res.status(200).json(produits);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits par ID :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

  

export default router;
