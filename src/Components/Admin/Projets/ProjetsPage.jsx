import React, { useState } from 'react';
import ProjectForm from './ProjetsForm';
import ProjectList from './ProjetsList';
import './Projets.css';


const ProjetsPage = () => {
  const [projects, setProjects] = useState([]);

  const handleAddProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <div className="projects-page">
      <h1>Add New Projects</h1>
      <ProjectForm onAddProject={handleAddProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjetsPage;
