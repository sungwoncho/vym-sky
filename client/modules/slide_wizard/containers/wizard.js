import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Wizard from '../components/wizard.jsx';

export const composer = ({context, slideDeckId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('slideDeck', slideDeckId).ready()) {
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);

    onData(null, {slideDeck});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  showSlide: actions.slideDecks.showSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Wizard);
