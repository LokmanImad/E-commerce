import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduit = ()  => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categories: '',
    image: ''
  });

  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // If there's an ID, fetch the product data and pre-fill the form
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/produit/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // If there's an ID, update the existing product
        await axios.put(`http://localhost:5000/api/produit/modifier/${id}`, formData);
      } else {
        // Otherwise, create a new product
        await axios.post("http://localhost:5000/api/produit/ajouter", formData);
      }
      navigate(-1); // Redirect back to product list
    } catch (error) {
      console.error("Error submitting form:", error);
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
            <label className="form-label">Image (URL)</label>
            <input 
              type="text" 
              className="form-control" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
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
