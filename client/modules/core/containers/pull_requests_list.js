import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import PullRequestsList from '../components/pull_requests_list.jsx';

export const composer = ({context, repo}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('pullRequests', repo._id).ready()) {
    let pullRequests = Collections.PullRequests.find({repoId: repo._id});
    onData(null, {pullRequests});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PullRequestsList);
