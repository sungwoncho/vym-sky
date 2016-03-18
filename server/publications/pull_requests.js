import {PullRequests} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  // Meteor.publish('pullRequests', function (repoId) {
  //   check(repoId, String);
  //
  //   return PullRequests.find({repoId});
  // });
  //
  // Meteor.publish('pullRequest', function (prId) {
  //   check(prId, String);
  //
  //   return PullRequests.find(prId);
  // });
}
