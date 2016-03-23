import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Repos, SlideDecks} from '/lib/collections';
import _ from 'lodash';

export function setupUserHook() {
  Accounts.onLogin(function (info) {
    // Only fire the hook when user authenticates with github
    // Sometime onLogin is called with info.type 'resume'
    if (info.type !== 'github') {
      return;
    }

    let user = info.user;
    let allRepoIds = [];

    function syncRepoAccess(page = 1) {
      Meteor.call('repos.getAll', page, Meteor.bindEnvironment(function (err, res) {
        let repoIds = _.map(res.repos, function (repo) {
          return repo.meta.id;
        });
        allRepoIds = allRepoIds.concat(repoIds);

        Repos.update({'meta.id': {$in: repoIds}}, {
          $addToSet: {collaboratorIds: user._id}
        }, {multi: true});
        SlideDecks.update({'repo.id': {$in: repoIds}}, {
          $addToSet: {collaboratorIds: user._id}
        }, {multi: true});

        if (res.nextPage) {
          syncRepoAccess(res.nextPage);
        }
      }));
    }

    syncRepoAccess();

    // Deny access to all repos that the user no longer has access to
    Repos.update({collaboratorIds: user._id, 'meta.id': {$nin: allRepoIds}}, {
      $pull: {collaboratorIds: user._id}}, {multi: true}
    );
    SlideDecks.update({collaboratorIds: user._id, 'repo.id': {$nin: allRepoIds}}, {
      $pull: {collaboratorIds: user._id}}, {multi: true}
    );
  });
}
