import {SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import shortid from 'shortid';

export default function () {
  Meteor.publish('slideDeck', function (slideDeckUid, options = {live: false}) {
    check(slideDeckUid, String);

    let getUserInfo = (userId) => {
      let user;

      if (userId) {
        let userDoc = Meteor.users.findOne(userId);
        user = {
          _id: userDoc._id,
          displayName: userDoc.profile.name || userDoc.services.github.username,
          githubHandle: userDoc.services.github.username
        };
      } else {
        user = {
          _id: shortid.generate(),
          displayName: 'Anonymous user'
        };
      }

      return user;
    };

    if (options.live) {
      let userDoc = getUserInfo(this.userId);
      SlideDecks.update({uid: slideDeckUid}, {$addToSet: {connectedUsers: userDoc}});

      this.onStop(function () {
        SlideDecks.update({uid: slideDeckUid}, {$pull: {connectedUsers: {_id: userDoc._id}}});
      });
    }

    return SlideDecks.find({uid: slideDeckUid});
  });

  Meteor.publish('slideDecksForRepo', function (repoId) {
    check(repoId, String);

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
