import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Components/main.css'
import './Components/Shop/main.css'
import AppAdmin from './Components/Admin/AppAdmin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduit from './Components/Admin/Produit/AddProduit'
import Details from './Components/Shop/Details'
import Shop from './Components/Shop/Shop'
import Authentification from './Components/Athentification/Authentification'
import Home from './Components/Home'
import About from './Components/About/About'
import AppClient from './Components/Client/AppClient'
import Panier from './Components/Panier/Panier'

import 'bootstrap/dist/css/bootstrap.min.css';
import Projet from './Components/Projet/Projet'
import Contact from './Components/Contact/Contact'
import ProjetDetails from './Components/Projet/ProjetDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Admin" element={<AppAdmin />} />
        <Route path="/AddProduit" element={<AddProduit/>}/>
        <Route path="/AddProduit/:id" element={<AddProduit/>}/>
        <Route path="/Produit" element={<Shop/>}/>
        <Route path="/Produit/:id" element={<Details/>}/>
        <Route path="/login" element={<Authentification/>}/>
        <Route path="/Profil" element={<AppClient/>}/>
        <Route path="/Panier" element={<Panier/>}/>
        <Route path="/Client" element={<AppClient/>}/>
        <Route path="/Projet" element={<Projet/>}/>
        <Route path="/contacte" element={<Contact/>}/>
        <Route path="/projetdetails/:id" element={<ProjetDetails/>}/>
        
        
      </Routes>
    </Router>
    </>
  )
}

export default App
