import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import AddRepoView from '../components/add_repo_view.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  function getOrgSettingUrl() {
    let baseUrl = 'https://github.com/settings/connections/applications';
    let githubClientId = Meteor.settings.public.githubClientId;
    return `${baseUrl}/${githubClientId}`;
  }

  if (Meteor.subscribe('collaboratingRepos').ready()) {
    let repos = Collections.Repos.find({
      collaboratorIds: Meteor.userId(),
      activated: false
    }).fetch();
    let currentUser = Meteor.user();

    onData(null, {repos, currentUser, orgSettingUrl: getOrgSettingUrl()});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  toggleActivatedStatus: actions.repos.toggleActivatedStatus,
  githubAuth: actions.users.githubAuth,
  syncRepos: actions.repos.syncRepos
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddRepoView);
