import React from 'react';

import HomeHeader from '../containers/header_home';

const LayoutHome = ({content = () => null}) => (
  <div>
    <HomeHeader />
    <main>
      {content()}
    </main>
  </div>
);

export default LayoutHome;
