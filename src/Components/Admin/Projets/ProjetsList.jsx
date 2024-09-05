import React from 'react';
import './Projets.css';

const ProjetsList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span>{project.date}</span>
          </div>
        ))
      ) : (
        <p>No projects added yet.</p>
      )}
    </div>
  );
};

export default ProjetsList;
