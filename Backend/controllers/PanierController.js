import Produit from '../models/Produit.js';
import Panier from '../models/Panier.js';

export const ajouterProduitAuPanier = async (req, res) => {
  const { utilisateurId, produitId, quantite } = req.body;

  try {
    // Fetch the product details from the `Produit` model
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Find the user's cart or create a new one
    let panier = await Panier.findOne({ utilisateur: utilisateurId });
    if (!panier) {
      panier = new Panier({ utilisateur: utilisateurId, produits: [] });
    }

    // Check if the product is already in the cart
    const productIndex = panier.produits.findIndex(p => p.produitId.equals(produitId));
    if (productIndex > -1) {
      // Update quantity if the product already exists in the cart
      panier.produits[productIndex].quantite += quantite;
    } else {
      // Add the new product to the cart
      panier.produits.push({
        produitId: produit._id,
        nom: produit.nom,
        prix: produit.prix,
        quantite,
        image: produit.image,
      });
    }

    // Save the updated cart
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout au panier", error });
  }
};
