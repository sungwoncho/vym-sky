import Home from '../components/home.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker} from 'mantra-core';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  githubAuth: actions.users.githubAuth,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
