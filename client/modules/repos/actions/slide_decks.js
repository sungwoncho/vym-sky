export default {
  createSlideDeck({Meteor, FlowRouter}, repoId, prId, title) {
    let sdDoc = {
      prId,
      repoId,
      title,
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
