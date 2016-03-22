import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import StatusBar from '../components/status_bar.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  nextSlide: actions.slide_engine_slide_decks.nextSlide,
  prevSlide: actions.slide_engine_slide_decks.prevSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StatusBar);
