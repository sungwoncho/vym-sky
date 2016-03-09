import {SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('slideDeck', function (slideDeckUid) {
    return SlideDecks.find({uid: slideDeckUid});
  });

  Meteor.publish('slideDecks', function (repoId) {
    return SlideDecks.find({repoId: repoId});
  });

  Meteor.publish('recentSlideDecksForUser', function (userId) {
    if (! userId) {
      this.ready();
      return;
    }

    let user = Meteor.users.findOne(userId);
    //TODO
    return;

  });
}
