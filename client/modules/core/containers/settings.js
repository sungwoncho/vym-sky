import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Settings from '../components/settings.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Settings);
