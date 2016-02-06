import GithubAPI from 'github';
import {Repos} from '/libs/collections';
import {check} from 'meteor/check';
import _ from 'lodash';

let github = new GithubAPI({version: '3.0.0'});

Meteor.methods({
  'repos.activate'(repoId) {
    check(repoId, String);

    Repos.update(repoId, {$set: {activated: true}});
  },

  'repos.deactivate'(repoId) {
    check(repoId, String);

    Repos.update(repoId, {$set: {activated: false}});
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
    }, Meteor.bindEnvrionment(function (err, res) {
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

  }
});
