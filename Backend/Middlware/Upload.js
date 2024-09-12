import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Répertoire de stockage des fichiers
const uploadDir = path.join(__dirname, '..', '..', 'src', 'img' , 'Produit'); // Adaptation du chemin relatif pour pointer vers "src/img"

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Spécifie le répertoire de stockage
  },
  filename: (req, file, cb) => {
    // Crée un nom de fichier unique en ajoutant un timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
