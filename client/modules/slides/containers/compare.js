import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker, compose} from 'mantra-core';

import Compare from '../components/compare/index.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Compare);
