import React from 'react';

import Header from '../containers/header';

const WizardLayout = ({content = () => null, slideDeckId, slideNumber}) => (
  <div>
    <Header slideDeckId={slideDeckId} currentSlideNumber={slideNumber} />
    <main>
      {content()}
    </main>
  </div>
);

export default WizardLayout;
