import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker, compose} from 'mantra-core';

import Header from '../components/header.jsx';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  onData(null, {
    currentUser: Meteor.user()
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Header);
