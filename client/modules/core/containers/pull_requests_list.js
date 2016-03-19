import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import PullRequestsList from '../components/pull_requests_list.jsx';

export const composer = ({context, repo}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PullRequestsList);
