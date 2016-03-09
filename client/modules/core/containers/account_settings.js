import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import AccountSettings from '../components/account_settings.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AccountSettings);
