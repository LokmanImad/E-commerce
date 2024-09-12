import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Commande from '../Commande/Commande';


const CompleteProfile = ({ activeContent }) => {
  const [formData, setFormData] = useState({
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer les données
    console.log('Profile data:', formData);
  };

  return (

    <Container className="mt-5">
       
         
      <h2 className="text-center mb-4">Complete Your Profile</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded" style={{ maxWidth: '500px', margin: 'auto', backgroundColor: '#f8f9fa' }}>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress" className="mt-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Submit
        </Button>
      </Form>
      
      
        
    </Container>
    
  );
};

export default CompleteProfile;
