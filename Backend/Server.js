import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routers/UserRouter.js';
import produitRoutes from './routers/ProduitRouter.js';
import panierRoutes from './routers/PanierRouter.js';
import commandeRouter from './routers/CommandeRouter.js';
import projetRouter from './routers/ProjetRouter.js';
import couponRouter from './routers/CouponRouter.js';






dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes utilisateur
app.use('/api/users', userRoutes);
app.use('/api/produit', produitRoutes);
app.use('/api/panier', panierRoutes);
app.use('/api/commande' , commandeRouter);
app.use('/api/projets', projetRouter);
app.use('/api/coupon', couponRouter);





// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/Erotman')
.then(() => {
  console.log('Connected to MongoDB');

})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
