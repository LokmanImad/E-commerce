import React, { useState } from 'react';
import './Projets.css';


const ProjetsForm = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject({ title, description, date });
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label>Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Project
      </button>
    </form>
  );
};

export default ProjetsForm;
