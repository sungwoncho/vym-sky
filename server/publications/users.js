import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('currentUser', function () {
    if (!this.userId) {
      return this.ready();
    }

    let options = {
      fields: {
        'services.github.username': 1,
        reposLastSyncedAt: 1,
        scopes: 1
      }
    };

    return Meteor.users.find(this.userId, options);
  });

  Meteor.publish('users', function (userIds) {
    if (!this.userId) {
      return this.ready();
    }

    let options = {
      fields: {
        'services.github.username': 1
      }
    };

    return Meteor.users.find({_id: {$in: userIds}}, options);
  });
}
