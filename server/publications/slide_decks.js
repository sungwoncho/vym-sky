import {SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('slideDeck', function (slideDeckId) {
    return SlideDecks.find({uid: slideDeckId});
  });

  Meteor.publish('slideDecks', function (repoId) {
    return SlideDecks.find({repoId: repoId});
  });
}
