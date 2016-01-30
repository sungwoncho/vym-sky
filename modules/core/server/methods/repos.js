// import GithubAPI from 'github';
// var GithubAPI = require('github');


Meteor.methods({
  activateRepo(repoId) {
    let github = new GithubAPI({
      version: '3.0.0'
    });

    github.authenticate({
      type: 'oauth',
      token: Meteor.user().services.github.accessToken
    });

    github.repos.createHook({

    }, function (err, res) {
      if (err) {
        console.log('Error occurred while activating repo: could not create webhook');
        console.error(err);
      }
    });
  }
});
