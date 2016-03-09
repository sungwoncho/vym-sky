import React from 'react';

import Header from '../containers/header';
import Footer from '../containers/footer';

const MainLayout = ({content = () => null}) => (
  <div>
    <Header />
    <main className="main-container">
      {content()}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
