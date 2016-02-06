import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker, compose} from 'react-komposer';
import moment from 'moment';

import Header from '../components/header/index.jsx';

export const composer = ({context}, onData) => {
  onData(null, {
    currentUser: Meteor.user()
  });
};

export default composeWithTracker(composer)(Header);
