import GithubAPI from 'github';
import {check} from 'meteor/check';
import {Repos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

let github = new GithubAPI({version: '3.0.0'});

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
    }
  });
}
