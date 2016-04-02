import stripeAPI from 'stripe';
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
          let repos = res.repos;

          repos.forEach(function (repo) {
            allRepoIds = allRepoIds.concat(repo.meta.id);

            let modifier = {
              $addToSet: {collaboratorIds: userId}
            };

            if (repo.permissions.admin) {
              modifier.$addToSet.adminIds = userId;
            }

            Repos.update({'meta.id': repo.meta.id}, modifier);
            SlideDecks.update({'repo.meta.id': repo.meta.id}, {
              $addToSet: {collaboratorIds: userId}
            });
          });

          if (res.nextPage) {
            // Recurse if next page exists
            syncRepoAccess(res.nextPage);
          }
        }));
      }

      syncRepoAccess();

      // Deny access to all repos that the user no longer has access to
      Repos.update({collaboratorIds: userId, 'meta.id': {$nin: allRepoIds}}, {
        $pull: {collaboratorIds: userId, adminIds: userId}}, {multi: true}
      );
      SlideDecks.update({collaboratorIds: userId, 'repo.meta.id': {$nin: allRepoIds}}, {
        $pull: {collaboratorIds: userId}}, {multi: true}
      );
    },

    'users.createOrUpdateSubscription'(token, repoId) {
      let stripe = stripeAPI(Meteor.settings.stripeSecretKey);
      let currentUser = Meteor.users.findOne(this.userId);

      if (currentUser.stripeCustomerId) {
        let sub = Meteor.wrapAsync(stripe.customers.retrieveSubscription, stripe.customers)(
          currentUser.stripeCustomerId,
          currentUser.stripeSubscriptionId
        );

        Meteor.wrapAsync(stripe.customers.updateSubscription, stripe.customers)(
          currentUser.stripeCustomerId,
          currentUser.stripeSubscriptionId,
          {
            quantity: sub.quantity + 1
          }
        );

      } else {
        let customer = Meteor.wrapAsync(stripe.customers.create, stripe.customers)({
          source: token.id,
          plan: 'pro',
          email: token.email
        });
        let sub = customer.subscriptions.data[0];

        Meteor.users.update(this.userId, {
          $set: {
            stripeCustomerId: customer.id,
            stripeSubscriptionId: sub.id
          }
        });
      }

      Repos.update(repoId, {$set: {plan: 'pro'}});

    }

  });
}
