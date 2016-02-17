import React from 'react';

import Header from '../containers/header';

const WizardLayout = ({content = () => null, slideDeckId}) => (
  <div>
    <Header slideDeckId={slideDeckId} />
    <main>
      {content()}
    </main>
  </div>
);

export default WizardLayout;
