import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Header from '../components/header.jsx';

export const composer = ({context, slideDeckId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('currentUser').ready() &&
      Meteor.subscribe('slideDeck', slideDeckId).ready()) {

    const currentUser = Meteor.user();
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);

    onData(null, {
      currentUser,
      slideDeck
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  wizardActions: {
    addSlide: actions.slideDecks.addSlide
  }
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
