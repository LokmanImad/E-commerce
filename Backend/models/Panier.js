const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanierSchema = new Schema({
    idPanier: { type: Schema.Types.ObjectId, ref: 'Panier' },
    produits: [{ type: Schema.Types.ObjectId, ref: 'Produit' }],
    quantite: { type: Number, required: true },
    total: { type: Number, required: true }
});

const Panier = mongoose.model('Panier', PanierSchema);

module.exports = Panier;
