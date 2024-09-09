import React from 'react';

const SideNav = ({ setActiveContent }) => {

//   const data = JSON.parse(localStorage.getItem("user_data"))
//   const username = data.name
  
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <a className="nav-link" href="#!" onClick={() => setActiveContent('AdminHome')}>
            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
            Dashboard
          </a>
          <div className="sb-sidenav-menu-heading">Interface</div>
          <a className="nav-link collapsed" href="#!" onClick={() => setActiveContent('Produit')} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
            Produit
            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
          </a>
         
          <a className="nav-link collapsed" href="#!" onClick={() => setActiveContent('Projets')} data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
            Projets
            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
          </a>

          <a className="nav-link collapsed" href="#!" onClick={() => setActiveContent('AddProduit')} data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
            Postulation
            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
          </a>
         
          <div className="sb-sidenav-menu-heading">Addons</div>
          <a className="nav-link" href="#!" onClick={() => setActiveContent('Tasks')}>
            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
            Suivie
          </a>
         
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
       
      </div>
    </nav>
  );
}

export default SideNav;
