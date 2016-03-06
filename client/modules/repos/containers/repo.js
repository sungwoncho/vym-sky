import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import RepoComponent from '../components/repo.jsx';

export const composer = ({context, ownerName, repoName}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('repo', ownerName, repoName).ready()) {
    let query = {name: repoName, 'owner.name': ownerName};
    let repo = Collections.Repos.findOne(query);
    Meteor.subscribe('slideDecks', repo._id);
    let slideDecks = Collections.SlideDecks.find({repoId: repo._id}).fetch();

    onData(null, {repo, slideDecks});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoComponent);
