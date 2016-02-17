import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('currentUser', function () {
    if (!this.userId) {
      this.ready();
      return;
    }

    let options = {
      fields: {
        'services.github.username': 1
      }
    };

    return Meteor.users.find(this.userId, options);
  });
}
