import {useDeps, composeAll,compose,  composeWithTracker} from 'mantra-core';

import Wizard from '../components/wizard.jsx';

export const composer = ({context, slideDeckId, currentSlideNumber}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  if (Meteor.subscribe('slideDeck', slideDeckId).ready()) {
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);

    onData(null, {
      slideDeck,
      currentSlideNumber
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  showSlide: actions.slideDecks.showSlide,
  reorderSlide: actions.slideDecks.reorderSlide,
  updateSlide: actions.slideDecks.updateSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Wizard);
