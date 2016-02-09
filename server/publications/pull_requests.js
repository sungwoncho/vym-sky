import {PullRequests} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('pullRequests', function (repoId) {
    return PullRequests.find({repoId: repoId});
  });

  Meteor.publish('pullRequest', function (prId) {
    return PullRequests.find(prId);
  });
}
