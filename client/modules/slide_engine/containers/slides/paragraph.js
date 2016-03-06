import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import ParagraphSlide from '/client/modules/slide_engine/components/slides/paragraph/index.jsx';

export const composer = ({context, slide, files, slideDeckId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  onData(null, {slide, files, slideDeckId});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  updateSlide: actions.slideDecks.updateSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ParagraphSlide);
