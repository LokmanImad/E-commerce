import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Shop/main.css'; // Assure-toi d'inclure ton fichier CSS
import Menu from '../Menu';

const BreadcrumbSection = () => (
  <div className="breadcrumb-section breadcrumb-bg">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
          <div className="breadcrumb-text">
            <p>Organic Information</p>
            <h1>Nos Projets</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SingleProject = ({ imageUrl, title, date, excerpt }) => (
  <div className="col-lg-4 col-md-6">
    <div className="single-latest-news">
      <a href="#">
        <div className="latest-news-bg">
          <img src={imageUrl} alt={title} className="img-thumbnail" width="100%" />
        </div>
      </a>
      <div className="news-text-box">
        <h3><a href="#">{title}</a></h3>
        <p className="blog-meta">
          <span className="date"><i className="fas fa-calendar"></i> {date}</span>
        </p>
        <p className="excerpt">{excerpt}</p>
        <a href="#" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets/getAllprojet');
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="latest-news mt-150 mb-150">
      <div className="container">
        <div className="row">
          {projects.map((project) => (
            <SingleProject
              key={project._id}
              imageUrl={`http://localhost:5000/uploads/${project.images[0]}`}  // Utilise la première image pour l'aperçu
              title={project.title}
              date={new Date(project.date).toISOString().split('T')[0]}
              excerpt={project.description} // Utilise la description comme extrait
            />
          ))}
        </div>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="pagination-wrap">
                  <ul>
                    <li><a href="#">Prev</a></li>
                    <li><a href="#">1</a></li>
                    <li><a className="active" href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projet = () => (
  <>
    <Menu/>
    <BreadcrumbSection />
    <ProjectsPage />
  </>
);

export default Projet;
