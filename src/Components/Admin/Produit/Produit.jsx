import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Produit.css";

const Produit = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/produit");
        setProducts(response.data);
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
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle Modify (redirect to the AddProduit form with product data)
  const handleModify = (id) => {
    navigate(`/AddProduit/${id}`);
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
            <th>image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.nom}</td>
              <td>{product.prix} €</td>
              <td>{product.stock}</td>
              <td>{product.categories}</td>
              <td>{product.image}</td>

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
