import mongoose from "mongoose";
const { Schema } = mongoose;

const commandeSchema = new Schema({
  DateCommande: { type: Date, required: true },
  Produits: [{
    produit: { type: Schema.Types.ObjectId, ref: 'Produit' },
    quantite: { type: Number, required: true }
  }],
  Etat: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Total: { type: Number, required: true },
  adresse: { type: String, required: true }, // Nouveau champ pour l'adresse
  telephone: { type: String, required: true }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;