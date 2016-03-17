export function githubAuth({Meteor, FlowRouter}, {scopes, redirectPath}) {
  Meteor.loginWithGithub({
    requestPermissions: scopes
  }, function (err) {
    if (err) {
      return console.log(err);
    }

    let userId = Meteor.userId();
    Meteor.call('users.setScopes', userId, scopes);

    if (redirectPath) {
      FlowRouter.go(redirectPath);
    }
  });
}
