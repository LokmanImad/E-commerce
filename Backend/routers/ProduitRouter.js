import express from 'express';
import Produit from '../models/Produit.js'
import { ajouterProduit, modifierProduit, supprimerProduit , getAllProduits , getProduitById  } from '../controllers/ProduitController.js';

const router = express.Router();


// Get a product by ID
router.get('/:id', getProduitById);
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
      // Convertir les IDs en ObjectId
      const idsArray = ids.split(',').map(id => {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return mongoose.Types.ObjectId(id);
        } else {
          console.error(`Format d'ID invalide : ${id}`);
          return null;
        }
      }).filter(id => id !== null); // Supprimer les IDs invalides
  
      if (idsArray.length === 0) {
        return res.status(400).json({ message: 'Aucun ID valide fourni' });
      }
  
      const produits = await Produit.find({ _id: { $in: [ObjectId("66da23cad2ea87d28f6352d5"), ObjectId("66da288948409fcf9bdf13b6")]   } });
  
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
