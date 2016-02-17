export default {
  showSlide({FlowRouter}, slideNumber) {
    FlowRouter.setQueryParams({slideNumber: slideNumber});
  },
  addSlide({Meteor, FlowRouter}, slideDeckId) {
    Meteor.call('slideDecks.addSlideInDeck', slideDeckId, function (err, newSlide) {
      FlowRouter.setQueryParams({slideNumber: newSlide.number});
    });
  }
};
