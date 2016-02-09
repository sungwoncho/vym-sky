import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import RepoComponent from '../components/repo.jsx';

export const composer = ({context, ownerName, repoName}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('repo', ownerName, repoName).ready()) {
    let query = {name: repoName, 'owner.name': ownerName};
    const repo = Collections.Repos.findOne(query);

    onData(null, {repo});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoComponent);
