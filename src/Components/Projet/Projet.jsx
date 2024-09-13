import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import Footer from '../Footer/Footer';

const BreadcrumbSection = () => (
  <div className="breadcrumb-section breadcrumb-bg">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
          <div className="breadcrumb-text">
            <p>Innovative & Reliable</p>
            <h1>Nos Projets</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SingleProject = ({ id, imageUrl, title, date, excerpt }) => (
  <div className="col-lg-4 col-md-6">
    <div className="single-latest-news">
      <Link to={`/projetdetails/${id}`}>
        <div className="latest-news-bg">
          <img src={imageUrl} alt={title} className="img-thumbnail" width="100%" />
        </div>
      </Link>
      <div className="news-text-box">
        <h3><Link to={`/projetdetails/${id}`}>{title}</Link></h3>
        <p className="blog-meta">
          <span className="date"><i className="fas fa-calendar"></i> {date}</span>
        </p>
        <p className="excerpt">{excerpt}</p>
        <Link to={`/projetdetails/${id}`} className="read-more-btn">read more <i className="fas fa-angle-right"></i></Link>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);  // Adjust the number per page as needed

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

  // Get current projects based on pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Pagination Logic
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="latest-news mt-150 mb-150">
      <div className="container">
        <div className="row">
          {currentProjects.map((project) => (
            <SingleProject
              key={project._id}
              id={project._id}
              imageUrl={`/src/img/${project.images[0]}`}
              title={project.title}
              date={new Date(project.date).toISOString().split('T')[0]}
              excerpt={project.description}
            />
          ))}
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="pagination-wrap">
              <ul>
                <li>
                  <a
                    href="#!"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </a>
                </li>
                {[...Array(totalPages).keys()].map(number => (
                  <li key={number + 1}>
                    <a
                      href="#!"
                      onClick={() => handlePageChange(number + 1)}
                      className={currentPage === number + 1 ? 'active' : ''}
                    >
                      {number + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#!"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projet = () => (
  <>
    <Menu />
    <BreadcrumbSection />
    <ProjectsPage />
    <Footer/>
  </>
);

export default Projet;
