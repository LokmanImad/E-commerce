import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Produit.css";

const Produit = () => {
  const [products, setProducts] = useState([]);
  const [promotionValues, setPromotionValues] = useState({}); // État pour suivre les valeurs de promotion
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/produit");
        setProducts(response.data);
        // Initialiser les valeurs de promotion
        const initialPromotions = response.data.reduce((acc, product) => {
          acc[product._id] = product.promotion || 0;
          return acc;
        }, {});
        setPromotionValues(initialPromotions);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produit/supprimer/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      const newPromotionValues = { ...promotionValues };
      delete newPromotionValues[id];
      setPromotionValues(newPromotionValues);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle Modify (redirect to the AddProduit form with product data)
  const handleModify = (id) => {
    navigate(`/AddProduit/${id}`);
  };

  // Handle Promotion Value Change
  const handlePromotionInputChange = (id, value) => {
    setPromotionValues({
      ...promotionValues,
      [id]: value
    });
  };

  // Handle Apply Promotion
  const handlePromotionApply = async (id) => {
    const newPromotion = promotionValues[id];
    try {
      await axios.put(`http://localhost:5000/api/produit/modifier/${id}`, { promotion: newPromotion });
      setProducts(products.map(product => 
        product._id === id ? { ...product, promotion: newPromotion } : product
      ));
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  return (
    <div className="product-page">
      <div className="header">
        <h3>Product List</h3>
        <Link className="add-button" to="/AddProduit">
          Add New
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Categories</th>
            <th>Images</th>
            <th>Promotion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.nom}</td>
              <td>{product.prix} DH</td>
              <td>{product.stock}</td>
              <td>{product.categories}</td>
              <td>
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={`/src/img/Produit/${image}`} 
                      alt={`Produit ${product.nom}`} 
                      style={{ width: '50px', height: '50px', marginRight: '5px' }} 
                    />
                  ))
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={promotionValues[product._id] || 0}
                  onChange={(e) => handlePromotionInputChange(product._id, e.target.value)}
                  style={{ width: '80px', marginRight: '5px' }}
                />
                <button
                  className="apply-button"
                  onClick={() => handlePromotionApply(product._id)}
                >
                  Apply
                </button>
              </td>
              <td>
                <button
                  className="modify-button"
                  onClick={() => handleModify(product._id)}
                >
                  Modify
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produit;
