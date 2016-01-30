import React from 'react';

const Layout = ({content = () => null}) => (
  <div>
    <header>
      header
    </header>
    <main>
      {content()}
    </main>
    <footer>
      footer
    </footer>
  </div>
);

export default Layout;
