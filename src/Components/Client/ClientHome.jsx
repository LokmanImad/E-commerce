import React ,  { useState , useEffect } from "react";
import Commande from "./Commande/Commande";
import { Card, Button, Modal, Form, Container, Alert  } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";





const ClientHome = ({ activeContent }) => {
  const navigate = useNavigate();

//   const [UserConect, setUserConect] = useState(null);

//   const getUserConnected = () => {
//     const userData = localStorage.getItem("user_data");
//     if (userData) {
//       setUserConect(JSON.parse(userData));
//     } else {
//       navigate("/");
//     }
//   };

//   useEffect((e) => {
//     getUserConnected();
//   }, []);


const [formData, setFormData] = useState({ phone: '', address: '', name: '', email: '' });
const [isCompleted, setIsCompleted] = useState(false);
const [showModal, setShowModal] = useState(false);
const [showUpdateAllModal, setShowUpdateAllModal] = useState(false);

useEffect(() => {
  // Récupérer les informations de l'utilisateur à partir du localStorage

   const userData = localStorage.getItem('user');

    if (!userData) {
      navigate('/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }
    



  const storedUser = JSON.parse(localStorage.getItem('user'));


  if (storedUser) {
    const { name, email, phone, address, id } = storedUser;
    setFormData({ phone, address, name, email });
    setIsCompleted(phone && address);  // Vérifier si le profil est complété
  }
}, []);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.id;

  try {
    const response = await axios.put(`http://localhost:5000/api/users/modi/${userId}`, {
      phone: formData.phone,
      address: formData.address
    });
    const updatedUser = response.data.user;

    localStorage.setItem('user', JSON.stringify({
      ...storedUser,
      phone: formData.phone,
      address: formData.address
    }));

    setIsCompleted(true);
    setShowModal(false);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
};

const handleUpdateAllSubmit = async (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.id;

  try {
    const response = await axios.put(`http://localhost:5000/api/users/modi/${userId}`, {
      phone: formData.phone,
      address: formData.address,
      name: formData.name,
      email: formData.email
    });
    const updatedUser = response.data.user;

    localStorage.setItem('user', JSON.stringify({
      ...storedUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    }));

    setIsCompleted(true);
    setShowUpdateAllModal(false);
  } catch (error) {
    console.error('Erreur lors de la mise à jour complète du profil:', error);
  }
};

const handleModal = () => setShowModal(!showModal);
const handleUpdateAllModal = () => setShowUpdateAllModal(!showUpdateAllModal);



  return (
    <div className="container-fluid px-4">
      {/* <h2>{UserConect ? `Hello ${UserConect.name}` : "Loading..."}</h2> */}
     

      <div className="row">
        {activeContent === "AdminHome" && (
          <>
         <Container className="mt-5">
      {!isCompleted && formData.phone === '' && formData.address === '' && (
        <Alert variant="warning" className="text-center">
          Please complete your profile by providing your phone number and address.
        </Alert>
      )}

      <Card className="shadow p-4 mb-5 rounded" style={{ maxWidth: '600px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center">Client Information</Card.Title>
          <Card.Text><strong>Name: </strong>{formData.name}</Card.Text>
          <Card.Text><strong>Email: </strong>{formData.email}</Card.Text>

          {isCompleted ? (
            <>
              <Card.Text><strong>Phone: </strong>{formData.phone}</Card.Text>
              <Card.Text><strong>Address: </strong>{formData.address}</Card.Text>
            </>
          ) : (
            <Alert variant="info">
              Vous n'avez pas complété votre profil. Veuillez indiquer votre numéro de téléphone et votre adresse.
            </Alert>
          )}

          <Button variant="primary" className="w-100 mb-2" onClick={handleModal}>
            {isCompleted ? 'Update Information' : 'Complete Information'}
          </Button>

          <Button variant="secondary" className="w-100" onClick={handleUpdateAllModal}>
            Modify All Information
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for completing/updating profile */}
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isCompleted ? 'Update Profile' : 'Complete Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Button variant="success" type="submit" className="mt-4 w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for updating all profile information */}
      <Modal show={showUpdateAllModal} onHide={handleUpdateAllModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update All Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateAllSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
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

            <Button variant="success" type="submit" className="mt-4 w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
          </>
        )}
        {activeContent === "Commande" &&  <Commande/>}
        {/* {activeContent === "Projets" && <ProjetsPage/>}
        {activeContent === "AddProduit" && <AddProduit/>}
        {activeContent === "Tasks" && <ShowLists />} */}
      </div>
    </div>
  );
};

export default ClientHome;
