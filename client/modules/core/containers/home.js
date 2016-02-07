import Home from '../components/home/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll, composeWithTracker} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Home);
