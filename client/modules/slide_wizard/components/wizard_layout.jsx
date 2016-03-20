import React from 'react';

const WizardLayout = ({content = () => null}) => (
  <div>
    <main>
      {content()}
    </main>
  </div>
);

export default WizardLayout;
