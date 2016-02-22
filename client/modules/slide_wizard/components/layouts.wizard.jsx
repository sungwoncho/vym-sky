import React from 'react';

import Header from '../containers/header';

const WizardLayout = ({content = () => null}) => (
  <div>
    <Header />
    <main>
      {content()}
    </main>
  </div>
);

export default WizardLayout;
