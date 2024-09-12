import express from 'express';
import multer from 'multer';
import Projet from '../models/Projet.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration de multer pour le stockage des fichiers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Répertoire de stockage des fichiers
const uploadDir = path.join(__dirname, '..', '..', 'src', 'img'); // Adaptation du chemin relatif pour pointer vers "src/img"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Dossier de stockage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier avec un timestamp
  }
});

const upload = multer({ storage });

const router = express.Router();

// Ajouter un Projet
router.post('/addprojet', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    const { title, description, date } = req.body;
    const images = req.files.map(file => `${path.basename(file.path)}`); // Chemin relatif à "src/img"

    const newProjet = new Projet({
      title,
      description,
      date,
      images
    });

    await newProjet.save();

    res.status(201).json({
      message: 'Projet ajouté avec succès',
      projet: newProjet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du projet', error });
  }
});


// Modifier un Projet
router.put('/delprojet/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const images = req.files.map(file => `uploads/${path.basename(file.path)}`); // Chemin relatif

    const updatedProjet = await Projet.findByIdAndUpdate(id, { title, description, date, images }, { new: true });

    res.json({
      message: 'Projet mis à jour avec succès',
      projet: updatedProjet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error });
  }
});

// Supprimer un Projet
router.delete('/delprojet/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Projet.findByIdAndDelete(id);

    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du projet', error });
  }
});

// Obtenir tous les projets
router.get('/getAllprojet', async (req, res) => {
  try {
    const projets = await Projet.find();
    res.json(projets);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets', error });
  }
});

// Obtenir un projet par ID
router.get('/getprojet/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projet = await Projet.findById(id);
    res.json(projet);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet', error });
  }
});

export default router;
