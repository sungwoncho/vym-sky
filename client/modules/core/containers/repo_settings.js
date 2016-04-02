import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RepoSettings from '../components/repo_settings.jsx';

export const composer = ({context, repo}, onData) => {
  const {Meteor, Counts} = context();

  let stripePublicKey = Meteor.settings.public.stripePublishableKey;

  if (Meteor.subscribe('monthlyUsage', repo._id).ready()) {
    let currentUsage = Counts.get('monthlySlideDeckUsage');

    onData(null, {
      stripePublicKey,
      currentUsage
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createOrUpdateSubscription: actions.users.createOrUpdateSubscription,
  downgradePlan: actions.repos.downgradePlan
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoSettings);
