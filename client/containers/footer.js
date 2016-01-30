import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker, compose} from 'react-komposer';
import moment from 'moment';

import Footer from '../components/footer/index.jsx';

export const composer = ({context}, onData) => {
  onData(null, {
    currentDate: new Date()
  });
};

export default composeWithTracker(composer)(Footer);
