import {useDeps, composeAll,compose,  composeWithTracker} from 'mantra-core';

import Wizard from '../components/wizard.jsx';

export const composer = ({context, slideDeckUid, currentSlideNumber}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('slideDeck', slideDeckUid).ready()) {
    let slideDeck = Collections.SlideDecks.findOne({uid: slideDeckUid});
    let files = Collections.Files.find().fetch();

    onData(null, {
      slideDeck,
      files,
      currentSlideNumber
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  showSlide: actions.slideDecks.showSlide,
  reorderSlide: actions.slideDecks.reorderSlide,
  updateSlide: actions.slideDecks.updateSlide,
  getFiles: actions.files.getFiles,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Wizard);
