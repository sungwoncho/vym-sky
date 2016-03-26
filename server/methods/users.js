import GithubAPI from 'github4';
import {check} from 'meteor/check';
import {Repos, SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default function () {
  Meteor.methods({
    'users.setScopes'(userId, scopes) {
      check(userId, String);
      check(scopes, Array);

      Meteor.users.update(userId, {$set: {scopes}});
    },

    'users.getCurrentScopes'() {
      let currentUser = Meteor.user();

      return currentUser.scopes;
    },

    'users.syncAccessWithGithub'() {
      this.unblock();

      let allRepoIds = [];
      let userId = this.userId;

      function syncRepoAccess(page = 1) {
        Meteor.call('repos.getAll', page, Meteor.bindEnvironment(function (err, res) {
          let repoIds = _.map(res.repos, function (repo) {
            return repo.meta.id;
          });
          allRepoIds = allRepoIds.concat(repoIds);
          Repos.update({'meta.id': {$in: repoIds}}, {
            $addToSet: {collaboratorIds: userId}
          }, {multi: true});
          SlideDecks.update({'repo.meta.id': {$in: repoIds}}, {
            $addToSet: {collaboratorIds: userId}
          }, {multi: true});

          if (res.nextPage) {
            syncRepoAccess(res.nextPage);
          }
        }));
      }

      syncRepoAccess();

      // Deny access to all repos that the user no longer has access to
      Repos.update({collaboratorIds: userId, 'meta.id': {$nin: allRepoIds}}, {
        $pull: {collaboratorIds: userId}}, {multi: true}
      );
      SlideDecks.update({collaboratorIds: userId, 'repo.meta.id': {$nin: allRepoIds}}, {
        $pull: {collaboratorIds: userId}}, {multi: true}
      );
    }
  });
}
