import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import AddRepoView from '../components/add_repo_view.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  function getOrgSettingUrl() {
    let baseUrl = 'https://github.com/settings/connections/applications';
    let githubClientId = Meteor.settings.public.githubClientId;
    return `${baseUrl}/${githubClientId}`;
  }

  let currentUser = Meteor.user();
  let reposToAdd = Collections.ReposToAdd.find({added: false}).fetch();
  let stripePublicKey = Meteor.settings.public.stripePublishableKey;

  onData(null, {
    currentUser,
    reposToAdd,
    orgSettingUrl: getOrgSettingUrl(),
    stripePublicKey
  });

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  toggleActivatedStatus: actions.repos.toggleActivatedStatus,
  addRepo: actions.repos.addRepo,
  addScope: actions.users.addScope,
  removeScope: actions.users.removeScope,
  getReposToAdd: actions.repos.getReposToAdd,
  clearReposToAdd: actions.repos.clearReposToAdd,
  createOrUpdateSubscription: actions.users.createOrUpdateSubscription
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddRepoView);
