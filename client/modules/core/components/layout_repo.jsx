import React from 'react';

import Header from '../containers/header';
import Footer from '../containers/footer';

const LayoutRepo = ({content = () => null, repo}) => (
  <div>
    <Header />
    <main className="main-container">
      {content(repo)}
    </main>
    <Footer />
  </div>
);

export default LayoutRepo;
