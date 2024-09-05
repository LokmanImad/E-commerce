import React, { useState } from "react";
import "./Produit.css";

const Produit = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: "$100" },
    { id: 2, name: "Product 2", price: "$200" },
    { id: 3, name: "Product 3", price: "$300" },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleModify = (id) => {
    alert(`Modify product with id: ${id}`);
  };

  const handleAddProduct = () => {
    const newProduct = { id: products.length + 1, name: "New Product", price: "$0" };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="product-page">
      <div className="header">
        <h1>Product List</h1>
        <button className="add-button" onClick={handleAddProduct}>
          Add New Product
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="modify-button" onClick={() => handleModify(product.id)}>
                  Modify
                </button>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>
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
