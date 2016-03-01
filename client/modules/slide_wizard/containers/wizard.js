import {useDeps, composeAll,compose,  composeWithTracker} from 'mantra-core';

import Wizard from '../components/wizard.jsx';

export const composer = ({context, slideDeckId, currentSlideNumber}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  if (Meteor.subscribe('slideDeck', slideDeckId).ready()) {
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);
    const files = Collections.Files.find({prId: slideDeck.prId}).fetch();

    onData(null, {
      slideDeck,
      files,
      currentSlideNumber
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  addSlide: actions.slideDecks.addSlide,
  removeSlide: actions.slideDecks.removeSlide,
  showSlide: actions.slideDecks.showSlide,
  reorderSlide: actions.slideDecks.reorderSlide,
  updateSlide: actions.slideDecks.updateSlide,
  getFiles: actions.files.getFiles,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Wizard);
