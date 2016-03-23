export default {
  createSlideDeck({Meteor, FlowRouter}, repoId, prNumber, title) {
    let userId = Meteor.userId();
    let sdDoc = {
      prNumber,
      repoId,
      title,
      ownerId: userId,
      collaboratorIds: [ userId ]
    };

    Meteor.call('slideDecks.create', sdDoc, function (err, slideDeckUid) {
      if (err) {
        return console.log('error while creating slideDeck', err);
      }

      FlowRouter.go('slide_deck.wizard', {slideDeckUid});
    });
  }
};
