import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SettingsAccount from '../components/settings_account.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('currentUser').ready()) {
    let currentUser = Meteor.user();

    onData(null, {
      currentUser
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsAccount);
