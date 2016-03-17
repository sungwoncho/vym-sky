import GithubAPI from 'github';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Repos} from '/lib/collections';
import _ from 'lodash';
import {getNextPage} from '../libs/repo_utils';

let github = new GithubAPI({version: '3.0.0'});

function checkUserExists(userId) {
  return Meteor.users.find(userId, {fields: {_id: 1}}).count() === 1;
}

export default function () {
  Meteor.methods({
    'repos.toggleActivatedStatus'(repoId) {
      check(repoId, String);

      let repo = Repos.findOne(repoId);

      Repos.update(repoId, {$set: {activated: !repo.activated}});
    },

    'repos.createWebhook'(repoId) {
      check(repoId, String);

      let repo = Repos.findOne(repoId);
      if (repo.hasWebhook) {
        return console.log(`The repo ${repo.name} already has webhook`);
      }
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      github.repos.createHook({
        user: repo.owner,
        repo: repo.name,
        name: 'web',
        config: {
          url: Meteor.settings.public.GitHubWebhookPayloadUrl,
          content_type: 'json',
          secret: Meteor.settings.GitHubWebhookSecret
        },
        events: ['pull_request']
      }, Meteor.bindEnvrionment(function (err) {
        if (err) {
          return console.log(err);
        }

        Repos.update(repoId, {$set: {hasWebhook: true}});
      }));
    },

    'repos.deleteWebhook'(repoId) {
      check(repoId, String);

      let repo = Repos.findOne(repoId);
      if (repo.hasWebhook) {
        return console.log(`The repo ${repo.name} already has webhook`);
      }
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      github.repos.getHooks({
        user: repo.owner,
        repo: repo.name
      }, Meteor.bindEnvironment(function (err, hooks) {
        if (err) throw err;

        var hook = _.find(hooks, function (hook) {
          return hook.config.url === Meteor.settings.public.GitHubWebhookPayloadUrl;
        });

        github.repos.deleteHook({
          user: repo.owner,
          repo: repo.name,
          id: hook.id
        }, Meteor.bindEnvironment(function (err, res) {
          if (err) throw err;

          Repos.update(repoId, {$set: {hasWebhook: false}});
        }));
      }));
    },

    'repos.addCollaborator'(repoId, userId) {
      check(repoId, String);
      check(userId, String);

      if (checkUserExists(userId)) {
        return Repos.update(repoId, {$addToSet: {collaboratorIds: userId}});
      }
    },

    'repos.removeCollaborator'(repoId, userId) {
      check(repoId, String);
      check(userId, String);

      if (checkUserExists(userId)) {
        return Repos.update(repoId, {$pull: {collaboratorIds: userId}});
      }
    },

    /**
     * @return {Boolean} - returns true if successfully synced all repos
     */
    'repos.syncForUser'() {
      let user = Meteor.users.findOne(this.userId);

      function fetchAndSaveUserRepo({page = 1}) {
        github.authenticate({
          type: 'oauth',
          token: user.services.github.accessToken
        });

        let repos = Meteor.wrapAsync(github.repos.getAll)({type: 'owner', page});

        repos.forEach(repo => {
          console.log(`Saving ${repo.name} for ${user.services.github.username}`);

          let repoDoc = {
            meta: {
              id: repo.id,
            },
            name: repo.name,
            description: repo.description,
            ownerName: repo.owner.login,
            private: repo.private,
            fork: repo.fork
          };

          if (Repos.find({'meta.id': repo.id}).count() === 1) {
            Repos.update({'meta.id': repo.id}, {$addToSet: {collaboratorIds: user._id}});
          } else {
            Repos.insert(_.assign(repoDoc, {collaboratorIds: [ user._id ]}));
          }
        });

        let nextPage = getNextPage(repos.meta.link);
        if (nextPage) {
          fetchAndSaveUserRepo({page: nextPage});
        }
      }

      fetchAndSaveUserRepo({page: 1});

      console.log('Updating reposLastSyncedAt for', this.userId);
      Meteor.users.update(this.userId, {$set: {reposLastSyncedAt: new Date()}});
      return true;
    }

  });
}
