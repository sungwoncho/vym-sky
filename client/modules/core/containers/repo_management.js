import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RepoManagement from '../components/repo_management.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('ownedRepos').ready()) {
    let repos = Collections.Repos.find({
      'owner._id': Meteor.userId()
    }).fetch();

    onData(null, {repos});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  syncRepos: actions.repos.syncRepos,
  toggleActivatedStatus: actions.repos.toggleActivatedStatus
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoManagement);
