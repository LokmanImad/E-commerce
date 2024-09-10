import express from 'express';
import Commande from '../models/Commande.js';
import Produit from '../models/Produit.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { produits, total, etat } = req.body;

    // Récupérer l'ID de l'utilisateur à partir du localStorage (côté frontend)
    const userId = req.body.userId || req.userId;

    // Valider que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier que tous les produits existent
    const produitIds = produits.map(p => p.produit);
    
    const produitsExistants = await Produit.find({ _id: { $in: produitIds } });

    if (produitsExistants.length !== produitIds.length) {
      return res.status(400).json({ message: 'Un ou plusieurs produits de la commande n\'existent pas.' });
    }

    

    // Créer la commande
    const nouvelleCommande = new Commande({
      DateCommande: new Date(),
      Produits: produits,
      Etat: etat,
      user: userId,
      Total: total
    });

    const commandeSauvegardee = await nouvelleCommande.save();
    res.status(201).json(commandeSauvegardee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Valider que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Obtenir les commandes de l'utilisateur
    const commandes = await Commande.find({ user: userId }).populate('Produits.produit');

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
  }
});

router.get('/All', async (req, res) => {
  try {
    const commandes = await Commande.find().populate('user').populate('Produits.produit');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
  }
});

router.patch('/modi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { etat } = req.body; // Assurez-vous que le nom du champ correspond à ce que vous envoyez depuis le frontend

    const updatedCommande = await Commande.findByIdAndUpdate(
      id,
      { $set: { Etat: etat } },
      { new: true }
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(updatedCommande);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
  }
});

export default router;