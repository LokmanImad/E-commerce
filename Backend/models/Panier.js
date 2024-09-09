import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PanierSchema = new Schema({
  utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  produits: [
    {
      produitId: { type: Schema.Types.ObjectId, ref: 'Produit', required: true },
      nom: { type: String, required: true },   // Include name
      prix: { type: Number, required: true },  // Include price
      quantite: { type: Number, required: true, default: 1 },
      image: { type: String },  // Include image if needed
    }
  ],
}, {
  timestamps: true
});

const Panier = mongoose.model('Panier', PanierSchema);
export default Panier;
