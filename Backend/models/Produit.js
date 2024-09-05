const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    stock: { type: Number, required: true },
    categories: { type: String }
});

const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;
