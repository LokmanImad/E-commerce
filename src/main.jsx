import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Components/main.css'
import './Components/Shop/main.css'

import Test from './Components/Test.jsx'
import Home from './Components/Home.jsx'
import Menu from './Components/Menu.jsx'
import Carousel from './Components/Carousel.jsx'
import Shop from './Components/Shop/Shop.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import AppAdmin from './Components/Admin/AppAdmin.jsx'
import Authentification from './Components/Athentification/Authentification.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Authentification/>
    {/* <AppAdmin/> */}
   {/* <Menu/> */}
   {/* <Contact/> */}
    {/* <Home/> */}
    {/* <Carousel/> */}
    {/* <Test/> */}
    {/* <Shop/> */}
    {/* <About/> */}
  </React.StrictMode>,
)
