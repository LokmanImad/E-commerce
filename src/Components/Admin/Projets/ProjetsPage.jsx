import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Composant de formulaire de projet
const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project ? project.title : '',
    description: project ? project.description : '',
    date: project ? new Date(project.date).toISOString().split('T')[0] : '',
    images: project ? project.images.join(', ') : '' // Initialisation avec les URLs des images
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    onSubmit({ ...formData, images: data });
  };

  

  return (
    <div className="mb-4">
      
      <div className="card">
        <div className="card-header">
          <h5>{project ? 'Edit Project' : 'Add New Project'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">Upload Images</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                onChange={handleFileChange}
                multiple
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Composant de la page des projets
const ProjetsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleAddProject = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEditProject = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projets/getprojet/${id}`);
      setSelectedProject(response.data);
      setShowForm(true);
    } catch (error) {
      console.error('Erreur lors de la récupération du projet:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projets/delprojet/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const data = formData.images;
      if (data) {
        const response = formData._id
          ? await axios.put(`http://localhost:5000/api/projets/delprojet/${formData._id}`, data)
          : await axios.post('http://localhost:5000/api/projets/addprojet', data);
          
        setProjects(formData._id
          ? projects.map(p => (p._id === formData._id ? response.data.projet : p))
          : [...projects, response.data.projet]
        );
      }
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-4" onClick={handleAddProject}>Add New Project</button>

      {showForm && (
        <ProjectForm
          project={selectedProject}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{new Date(project.date).toISOString().split('T')[0]}</td>
                <td>
                  {project.images && project.images.map((img, index) => (
                    <img key={index}  src={`http://localhost:5000/uploads/${img}`} alt={`Projesct ${img}`} className="img-thumbnail" width="10" />
                  ))}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProject(project._id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjetsPage;
