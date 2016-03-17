import {Repos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('collaboratingRepos', function () {
    if (!this.userId) {
      this.ready();
      return;
    }

    return Repos.find({collaboratorIds: this.userId});
  });

  Meteor.publish('repo', function (ownerName, repoName) {
    check(ownerName, String);
    check(repoName, String);

    return Repos.find({ownerName, name: repoName});
  });
}
