import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import AddRepoView from '../components/add_repo_view.jsx';

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
  toggleActivatedStatus: actions.repos.toggleActivatedStatus
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddRepoView);
