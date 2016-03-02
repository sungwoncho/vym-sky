export default {
  createSlideDeck({Meteor, FlowRouter}, prId) {
    let sdDoc = {
      prId: prId,
      ownerId: Meteor.userId()
    };

    Meteor.call('slideDecks.create', sdDoc, function (err, slideDeckUid) {
      if (err) {
        return console.log('error while creating slideDeck', err);
      }

      FlowRouter.go('slide_deck.wizard', {slideDeckUid: slideDeckUid});
    });
  }
};
