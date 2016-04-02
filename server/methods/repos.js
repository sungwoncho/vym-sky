import stripeAPI from 'stripe';
import GithubAPI from 'github4';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Repos, SlideDecks} from '/lib/collections';
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

    /**
     * @param {Object} repo - repo object originally created by 'repos.getAll'
     */
    'repos.add'(repo) {
      check(repo, Object);

      if (Repos.find({'meta.id': repo.meta.id}).count() === 0) {
        let repoDoc = _.assign(repo, {collaboratorIds: [ this.userId ]});

        // Choose lite plan by default
        if (repo.private) {
          repoDoc.plan = 'lite';
        }

        Repos.insert(repoDoc);
      } else {
        Repos.update({'meta.id': repo.meta.id}, {$addToSet: {collaboratorIds: this.userId }});
      }
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
        events: [ 'pull_request' ]
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
     * @return {Object} repoInfo
     * @return {Object[]} repoInfo.repos
     * @return {Number} repoInfo.nextPage
     */
    'repos.getAll'(page = 1) {
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      let repos = Meteor.wrapAsync(github.repos.getAll)({page, per_page: 50});
      let link = repos.meta.link;

      repos = repos.map(repo => (
        {
          meta: {
            id: repo.id,
          },
          name: repo.name,
          description: repo.description,
          ownerName: repo.owner.login,
          private: repo.private,
          fork: repo.fork,
          added: Repos.find({'meta.id': repo.id}).count() !== 0
        }
      ));

      return {
        repos,
        nextPage: getNextPage(link)
      };
    },

    'repos.checkMonthlyQuota'(repoId) {
      check(repoId, String);
      const monthlyQuota = 10;

      let currentUsage = SlideDecks.find({repoId}).count();

      return currentUsage <= monthlyQuota;
    },

    'repos.downgrade'(repoId) {
      check(repoId, String);
      let stripe = stripeAPI(Meteor.settings.stripeSecretKey);
      let currentUser = Meteor.users.findOne(this.userId);

      let sub = Meteor.wrapAsync(stripe.customers.retrieveSubscription, stripe.customers)(
        currentUser.stripeCustomerId,
        currentUser.stripeSubscriptionId
      );

      Meteor.wrapAsync(stripe.customers.updateSubscription, stripe.customers)(
        currentUser.stripeCustomerId,
        currentUser.stripeSubscriptionId,
        {
          quantity: sub.quantity - 1
        }
      );

      Repos.update(repoId, {$set: {plan: 'lite'}});
    }

  });
}
