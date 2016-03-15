import React from 'react';

import Header from '../containers/header';
import Footer from '../containers/footer';

const LayoutMain = ({content = () => null}) => (
  <div>
    <Header />
    <main className="main-container">
      {content()}
    </main>
    <Footer />
  </div>
);

export default LayoutMain;
