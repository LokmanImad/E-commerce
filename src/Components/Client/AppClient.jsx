import React, { useState } from 'react';
import NavBarClient from './NavBarClient'
import SideNav from './SideNav';

import ClientHome from './ClientHome';

const AppClient = () => {
  const [activeContent, setActiveContent] = useState('AdminHome');

  return (
    <div>
       <NavBarClient/>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav setActiveContent={setActiveContent} />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <ClientHome activeContent={activeContent} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppClient;
