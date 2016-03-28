import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Features from '../components/features.jsx';
import {ensureGuestUser} from '../libs/auth';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(ensureGuestUser),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Features);
