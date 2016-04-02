import React from 'react';

import BillingTable from './billing_table.jsx';

const BillingSettings = ({privateRepos, totalMonthlyCost}) => (
  <div>
    <h2>Billing</h2>

    <h3>Monthly billing</h3>

    <BillingTable repos={privateRepos} />

    Total monthly cost: ${totalMonthlyCost}
  </div>
);

export default BillingSettings;
