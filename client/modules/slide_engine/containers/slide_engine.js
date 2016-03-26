import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import SlideEngine from '../components/slide_engine.jsx';

export const composer = ({context, slideDeckUid}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('slideDeck', slideDeckUid, {live: true}).ready()) {
    let slideDeck = Collections.SlideDecks.findOne({uid: slideDeckUid});
    let currentUser = Meteor.user();
    onData(null, {slideDeck, currentUser});
  }
};

export const depsMapper = (context, actions) => ({
  nextSlide: actions.slide_engine_slide_decks.nextSlide,
  prevSlide: actions.slide_engine_slide_decks.prevSlide,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SlideEngine);
