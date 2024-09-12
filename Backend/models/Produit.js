import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    stock: { type: Number, required: true },
    categories: { type: String },
    images: [{ type: String }], // Tableau pour les noms de fichiers d'images
    promotion: { type: Number, default: 0 }
});

const Produit = mongoose.model('Produit', ProduitSchema);

export default Produit;
