export default {
  createSlideDeck({Meteor, FlowRouter}, repoId, prNumber, title) {
    let sdDoc = {
      prNumber,
      repoId,
      title,
      ownerId: Meteor.userId()
    };

    Meteor.call('slideDecks.create', sdDoc, function (err, slideDeckUid) {
      if (err) {
        return console.log('error while creating slideDeck', err);
      }

      FlowRouter.go('slide_deck.wizard', {slideDeckUid});
    });
  }
};
