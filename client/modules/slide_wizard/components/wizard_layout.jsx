import React from 'react';

const WizardLayout = ({content = () => null}) => (
  <main>
    {content()}
  </main>
);

export default WizardLayout;
