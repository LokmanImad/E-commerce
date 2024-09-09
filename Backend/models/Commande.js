import mongoose from "mongoose";
const { Schema } = mongoose;


const commandeSchema = new Schema({
  idCommande: { type: Schema.Types.ObjectId, auto: true },
  DateCommande: { type: Date, required: true },
  Produits: [{
    produit: { type: Schema.Types.ObjectId, ref: 'Produit' },
    quantite: { type: Number, required: true }
}],
  Etat: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Total: { type: Number, required: true }
}, {
  timestamps: true
});

const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;
