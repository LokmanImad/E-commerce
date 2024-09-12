import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduit = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categories: '',
  });
  const [images, setImages] = useState([]);
  const { id } = useParams(); // Récupérer l'ID du produit à modifier
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Si un ID est présent, on récupère les données du produit à modifier
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/produit/getproduit/${id}`);
          const productData = response.data;
          setFormData({
            nom: productData.nom || '',
            description: productData.description || '',
            prix: productData.prix || '',
            stock: productData.stock || '',
            categories: productData.categories || '',
          });
          // On ne charge pas les images ici pour éviter de les afficher dans le formulaire
        } catch (error) {
          console.error("Erreur lors de la récupération du produit :", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files)); // Stocke plusieurs fichiers
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Ajouter les autres champs de formulaire
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Ajouter les images
    images.forEach((image) => {
      formDataToSend.append('images', image); // Utiliser 'images' pour correspondre à la clé du tableau dans le backend
    });

    try {
      if (id) {
        // Si un ID est présent, on est en mode modification
        await axios.put(`http://localhost:5000/api/produit/updateproduit/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Sinon, on crée un nouveau produit
        await axios.post("http://localhost:5000/api/produit/ajouter", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate('/produit'); // Redirection vers la liste des produits
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg p-4 mt-5" style={{ width: '50%', borderRadius: '10px' }}>
        <h2 className="mb-4 text-center">{id ? "Modifier le produit" : "Ajouter un produit"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input 
              type="text" 
              className="form-control" 
              name="nom" 
              value={formData.nom} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Prix</label>
            <input 
              type="number" 
              className="form-control" 
              name="prix" 
              value={formData.prix} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input 
              type="number" 
              className="form-control" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Catégories</label>
            <input 
              type="text" 
              className="form-control" 
              name="categories" 
              value={formData.categories} 
              onChange={handleChange} 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Images</label>
            <input 
              type="file" 
              className="form-control" 
              name="images" 
              onChange={handleFileChange} 
              multiple // Permet la sélection de plusieurs fichiers
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {id ? "Modifier le produit" : "Ajouter le produit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduit;
