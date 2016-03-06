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
}
