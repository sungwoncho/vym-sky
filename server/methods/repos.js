import github from 'octonode';
import {Repos} from '/libs/collections';
import {check} from 'meteor/check';

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

    let client = github.client(Meteor.user().services.github.accessToken);
    let ghrepo = client.ghrepo(repo.getFullName());

    ghrepo.hook({
      name: 'coddee',
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
  }
});
