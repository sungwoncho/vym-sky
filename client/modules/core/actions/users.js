import {githubAuth} from '../libs/auth';
import _ from 'lodash';

export default {
  githubAuth({Meteor, FlowRouter}, {scopes, redirectPath}) {
    githubAuth({Meteor, FlowRouter}, {scopes, redirectPath});
  },

  ensureLoggedin({Meteor, FlowRouter}) {
    if (!Meteor.userId()) {
      FlowRouter.go('home');
    }
  },

  addScope({Meteor, FlowRouter}, {scopeToAdd, redirectPath}) {
    Meteor.call('users.getCurrentScopes', function (err, oldScopes) {
      if (err) {
        return console.log('Error occurred while getting the current scope', err);
      }

      let newScopes = oldScopes;
      newScopes.push(scopeToAdd);
      newScopes = _.uniq(newScopes);
      githubAuth({Meteor, FlowRouter}, {scopes: newScopes, redirectPath});
    });
  },

  removeScope({Meteor, FlowRouter}, {scopeToRemove, redirectPath}) {
    Meteor.call('users.getCurrentScopes', function (err, oldScopes) {
      if (err) {
        return console.log('Error occurred while getting the current scope', err);
      }

      let newScopes = _.without(oldScopes, scopeToRemove);
      githubAuth({Meteor, FlowRouter}, {scopes: newScopes, redirectPath});
    });
  },

  logout({Meteor, FlowRouter}) {
    Meteor.logout(function (err) {
      if (err) {
        return console.log(err);
      }

      FlowRouter.go('home');
    });
  }
};
