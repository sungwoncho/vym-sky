import React from 'react';

const RepoSettings = ({repo,
  downgradePlan, stripePublicKey, createOrUpdateSubscription, currentUsage, monthlyQuota}) => {

  function onUpgrade() {
    e.preventDefault();

    // StripeCheckout is available by external script. Check <head>.
    let checkoutHandler = StripeCheckout.configure({
      key: stripePublicKey,
      localse: 'auto',
      token(token) {
        createOrUpdateSubscription(token, repo._id, function (err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    });

    checkoutHandler.open({
      name: 'Private repo',
      amount: 1200,
      currency: 'usd',
      panelLabel: '{{amount}} per month'
    });
  }

  function onDowngrade(e) {
    e.preventDefault();
    downgradePlan(repo._id);
  }

  return (
    <div>
      {
        repo.private ? repo.plan === 'lite' ?
          <a href="#" onClick={onUpgrade}>Go Pro</a> :
          <a href="#" onClick={onDowngrade}>Stop Pro Plan</a> : <span></span>
      }

      {
        repo.plan === 'lite' ?
        <div>Used {currentUsage} of 10 monthly allowance</div> : <span></span>
      }
    </div>
  );
};

export default RepoSettings;
