import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Toolbar from '../components/toolbar.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  addSlide: actions.slideDecks.addSlide,
  removeSlide: actions.slideDecks.removeSlide,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Toolbar);
