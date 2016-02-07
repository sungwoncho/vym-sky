import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import SlideEngine from '../components/slide_engine/index.jsx';

export const composer = ({context, slideDeckId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  if (Meteor.subscribe('slideDeck', slideDeckId).ready()) {
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);
    onData(null, {slideDeck});
  }
};

export const depsMapper = (context, actions) => ({
  nextSlide: actions.slide_decks.nextSlide,
  prevSlide: actions.slide_decks.prevSlide,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SlideEngine);
