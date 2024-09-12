import Produit from '../models/Produit.js';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration de multer pour le stockage des fichiers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'src', 'img');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// getbyId product 
export const getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.status(200).json(produit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// get all product 
export const getAllProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new product
export const ajouterProduit = async (req, res) => {
    try {
        const { nom, description, prix, stock, categories } = req.body;
        const images = req.files ? req.files.map(file => file.filename) : []; // Tableau des noms de fichiers
        const nouveauProduit = new Produit({ nom, description, prix, stock, categories, images });
        const savedProduit = await nouveauProduit.save();
        res.status(201).json(savedProduit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Mettre à jour un produit
export const modifierProduit = async (req, res) => {
    try {
        const produitId = req.params.id;
        const updateData = req.body;
        if (req.files) {
            updateData.images = req.files.map(file => file.filename); // Met à jour les images
        }
        const updatedProduit = await Produit.findByIdAndUpdate(produitId, updateData, { new: true });
        if (!updatedProduit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.status(200).json(updatedProduit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product
export const supprimerProduit = async (req, res) => {
    try {
        const produitId = req.params.id;
        const deletedProduit = await Produit.findByIdAndDelete(produitId);
        if (!deletedProduit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// export const getProduitsByIds = async (req, res) => {
//     const { ids } = req.query;
  
//     if (!ids) {
//       return res.status(400).json({ message: 'No IDs provided' });
//     }
  
//     try {
//       // Convertir les IDs en tableau
//       const idsArray = ids.split(',');
//       const produits = await Produit.find({ _id: { $in: idsArray } });
//       res.status(200).json(produits);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
