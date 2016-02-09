import {Repos} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('ownedRepos', function () {
    if (!this.userId) {
      this.ready();
      return;
    }

    return Repos.find({'owner._id': this.userId});
  });

  Meteor.publish('repo', function (ownerName, repoName) {
    return Repos.find({'owner.name': ownerName, name: repoName});
  });
}
