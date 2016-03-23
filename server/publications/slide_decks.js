import {SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('slideDeck', function (slideDeckUid) {
    return SlideDecks.find({uid: slideDeckUid});
  });

  Meteor.publish('slideDecksForRepo', function (repoId) {
    return SlideDecks.find({repoId});
  });

  Meteor.publish('slideDecksForCurrentUser', function () {
    if (!this.userId) {
      this.ready();
      return;
    }

    return SlideDecks.find({collaboratorIds: this.userId});
  });
}
