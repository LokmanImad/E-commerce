import mongoose from "mongoose";
const { Schema } = mongoose;


const commandeSchema = new Schema({
  idCommande: { type: Schema.Types.ObjectId, auto: true },
  DateCommande: { type: Date, required: true },
  Produits: [{ type: Schema.Types.ObjectId, ref: 'Produit' }],
  Etat: { type: String, required: true },
  quantite: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Total: { type: Number, required: true }
}, {
  timestamps: true
});

const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;
