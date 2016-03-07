export default {
  showSlide({FlowRouter}, slideNumber) {
    FlowRouter.setQueryParams({slideNumber: slideNumber});
  },
  addSlide({Meteor, FlowRouter}, slideDeckId, slideNumber, done) {
    Meteor.call('slideDecks.addSlideInDeck', slideDeckId, slideNumber, function (err, newSlide) {
      FlowRouter.setQueryParams({slideNumber: newSlide.number});

      if (done) {
        done();
      }
    });
  },
  removeSlide({Meteor, FlowRouter}, slideDeckId, slideNumber, done) {
    Meteor.call('slideDecks.removeSlideInDeck', slideDeckId, slideNumber, function (err, res) {
      if (res.hasPrevSlide && !res.hasNextSlide) {
        FlowRouter.setQueryParams({slideNumber: slideNumber - 1});
      } else if (!res.hasPrevSlide && !res.hasNextSlide) {
        FlowRouter.setQueryParams({slideNumber: null});
      }

      if (done) {
        done();
      }
    });
  },
  reorderSlide({Meteor}, slideDeckId, fromSlideNumber, toSlideNumber) {
    Meteor.call('slideDecks.reorderSlide', slideDeckId, fromSlideNumber, toSlideNumber, function () {
      FlowRouter.setQueryParams({slideNumber: toSlideNumber});
    });
  },
  updateSlide({Meteor}, slideDeckId, slideNumber, modifier, options = {}) {
    Meteor.call('slideDecks.updateSlide', slideDeckId, slideNumber, modifier, options);
  },
  setSection({Meteor}, slideDeckId, slideNumber, sectionDoc, position) {
    Meteor.call('slideDecks.upsertSectionInSlide', slideDeckId, slideNumber, sectionDoc, position);
  },
  removeSection({Meteor}, slideDeckId, slideNumber, position) {
    Meteor.call('slideDecks.removeSectionFromSlide', slideDeckId, slideNumber, position);
  }
};
