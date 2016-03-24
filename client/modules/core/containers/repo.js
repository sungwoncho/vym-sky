import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import RepoComponent from '../components/repo.jsx';

export const composer = ({context, ownerName, repoName}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('repo', ownerName, repoName).ready()) {
    let repo = Collections.Repos.findOne({name: repoName, 'ownerName': ownerName});

    onData(null, {
      repo,
      currentUser: Meteor.user()
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoComponent);
