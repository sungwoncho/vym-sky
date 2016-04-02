import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SettingsBilling from '../components/settings_billing.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('currentUser').ready() && Meteor.subscribe('adminRepos').ready()) {
    let currentUser = Meteor.user();

    let privateRepos = Collections.Repos.find({
      adminIds: currentUser._id,
      private: true
    }).fetch();
    let totalMonthlyCost = 0;

    privateRepos.forEach(repo => {
      if (repo.plan === 'pro') {
        totalMonthlyCost += 12;
      }
    });

    onData(null, {
      privateRepos,
      totalMonthlyCost
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsBilling);
