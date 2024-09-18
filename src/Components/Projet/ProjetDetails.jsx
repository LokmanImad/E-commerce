import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Menu'; // Assurez-vous d'importer votre composant Menu
import './main.css'; // Assurez-vous de créer ce fichier pour les styles CSS
import Footer from '../Footer/Footer';


const ProjetDetails = () => {
  const { id } = useParams(); // Récupère l'ID du projet à partir de l'URL
  const [projet, setProjet] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Récupérer les détails du projet par ID
  useEffect(() => {
    const fetchProjetDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projets/getprojet/${id}`);
        setProjet(response.data);
        setMainImage(response.data.images[0]); // Définit la première image comme image principale
          // Récupérer les projets connexes (sans filtre par catégorie, afficher seulement 3)
          const relatedResponse = await axios.get(`http://localhost:5000/api/projets/getAllprojet`);
          setRelatedProjects(relatedResponse.data.slice(0, 3)); // Limiter à 3 projets
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du projet :", error);
      }
    };

      

    fetchProjetDetails();
   
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!projet) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Menu />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Voir plus de détails</p>
                <h1>{projet.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-project mt-150 mb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="main-image-container">
                <img src={`/src/img/${mainImage}`} alt={projet.title} className="main-image" />
              </div>
              <div className="thumbnail-gallery">
                {projet.images.map((image, index) => (
                  <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(image)}>
                    <img src={`/src/img/${image}`} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-project-content">
                <h3>{projet.nom}</h3>
                <p><strong>Date de projet:</strong> {new Date(projet.date).toLocaleDateString()}</p>

                <p><strong>Description:</strong><br/> {projet.description}</p>
                
               
              
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Section des projets connexes */}
      <div className="more-products mb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3><span className="orange-text">Projets</span> Connexes</h3>
                <p>Découvrez d'autres projets similaires.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {relatedProjects.length === 0 ? (
              <p className="text-center">Aucun projet connexe disponible pour l'instant.</p>
            ) : (
              relatedProjects.map((relatedProject) => (
                <div key={relatedProject._id} className="col-lg-4 col-md-6 text-center">
                  <div className="single-project-item">
                    <div className="project-image">
                      <Link to={`/projetDetails/${relatedProject._id}`}>
                        <img src={`/src/img/${relatedProject.images[0]}`} alt={relatedProject.nom} className="img-fluid" />
                      </Link>
                    </div>
                    <h3>{relatedProject.nom}</h3>
                    <p><strong>Date de projet:</strong> {new Date(relatedProject.date).toLocaleDateString()}</p>
                    <Link to={`/projetDetails/${relatedProject._id}`} className="cart-btn">
                      <i className="fas fa-info-circle"></i> Voir les Détails
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer/>


    </div>
  );
};

export default ProjetDetails;
