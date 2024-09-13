import React, { useEffect } from "react";
import Produit from "./Produit/Produit";
import ProjetsPage from "./Projets/ProjetsPage";
import AddProduit from "./Produit/AddProduit";
import Commande from "./Commande/Commande";
import Coupon from "./Coupon/Coupon";
import { useNavigate } from "react-router-dom";

const AdminHome = ({ activeContent }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    // Vérifier si l'utilisateur est connecté et a le rôle 'admin'
    if (!userData || userData.role !== "admin") {
      navigate("/login"); // Rediriger vers la page de connexion si non-admin ou non connecté
    }
  }, [navigate]);

  return (
    <div className="container-fluid px-4">
      <div className="row">
        {activeContent === "AdminHome" && (
          <>
            <Produit/>
          </>
        )}
        {activeContent === "Produit" && <Produit />}
        {activeContent === "Projets" && <ProjetsPage />}
        {activeContent === "Commande" && <Commande />}
        {activeContent === "Coupon" && <Coupon />}
      </div>
    </div>
  );
};

export default AdminHome;
