import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker, compose} from 'mantra-core';

import Footer from '../components/footer.jsx';

export const composer = ({context}, onData) => {
  onData(null, {
    currentDate: new Date()
  });
};

export default composeWithTracker(composer)(Footer);
