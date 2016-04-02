import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RepoSettings from '../components/repo_settings.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let stripePublicKey = Meteor.settings.public.stripePublishableKey;

  onData(null, {
    stripePublicKey
  });
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
