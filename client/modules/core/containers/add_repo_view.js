import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import AddRepoView from '../components/add_repo_view.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('ownedRepos').ready()) {
    let repos = Collections.Repos.find({
      'owner._id': Meteor.userId(),
      activated: false
    }).fetch();
    let currentUser = Meteor.user();

    onData(null, {repos, currentUser});
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
