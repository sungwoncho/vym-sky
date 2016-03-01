import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Header from '../components/header.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  function getCurrentSlideNumber() {
    return parseInt(FlowRouter.getQueryParam('slideNumber')) || 0;
  }

  let slideDeckId = FlowRouter.getParam('slideDeckId');
  let currentSlideNumber = getCurrentSlideNumber();

  if (Meteor.subscribe('currentUser').ready() &&
      Meteor.subscribe('slideDeck', slideDeckId).ready()) {

    let currentUser = Meteor.user();
    let slideDeck = Collections.SlideDecks.findOne(slideDeckId);

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
