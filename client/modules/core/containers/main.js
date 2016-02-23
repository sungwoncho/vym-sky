import Main from '../components/main.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  login: actions.users.login,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Main);