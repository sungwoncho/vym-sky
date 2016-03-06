import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Header from '../components/header.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  function getCurrentSlideNumber() {
    return parseInt(FlowRouter.getQueryParam('slideNumber')) || 0;
  }

  let currentSlideNumber = getCurrentSlideNumber();
  let slideDeckUid = FlowRouter.getParam('slideDeckUid');

  if (Meteor.subscribe('slideDeck', slideDeckUid).ready()) {
    let slideDeck = Collections.SlideDecks.findOne({uid: slideDeckUid});

    onData(null, {
      slideDeck,
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
