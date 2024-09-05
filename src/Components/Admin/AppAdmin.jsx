import React, { useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import SideNav from './SideNav';
import AdminHome from './AdminHome';

const AppAdmin = () => {
  const [activeContent, setActiveContent] = useState('AdminHome');

  return (
    <div>
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav setActiveContent={setActiveContent} />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <AdminHome activeContent={activeContent} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppAdmin;
