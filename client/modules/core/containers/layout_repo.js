import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import LayoutRepo from '../components/layout_repo.jsx';

export const composer = ({context, repoName, ownerName}, onData) => {
  const {Collections, Meteor} = context();

  if (Meteor.subscribe('repo', ownerName, repoName).ready()) {
    let repo = Collections.Repos.find({ownerName, repoName});
    onData(null, {repo});
  }

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(LayoutRepo);
