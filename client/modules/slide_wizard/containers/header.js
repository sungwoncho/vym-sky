import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Header from '../components/header.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  function getCurrentSlideNumber() {
    return parseInt(FlowRouter.getQueryParam('slideNumber')) || 1;
  }

  const slideDeckId = FlowRouter.getParam('slideDeckId');
  const currentSlideNumber = getCurrentSlideNumber();

  if (Meteor.subscribe('currentUser').ready() &&
      Meteor.subscribe('slideDeck', slideDeckId).ready()) {

    const currentUser = Meteor.user();
    const slideDeck = Collections.SlideDecks.findOne(slideDeckId);


    onData(null, {
      currentUser,
      slideDeck,
      slideDeckId,
      currentSlideNumber
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  wizardActions: {
    addSlide: actions.slideDecks.addSlide,
    removeSlide: actions.slideDecks.removeSlide
  }
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
