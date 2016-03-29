export function githubAuth({Meteor, FlowRouter}, {scopes, redirectPath}) {
  Meteor.loginWithGithub({
    requestPermissions: scopes
  }, function (err) {
    if (err) {
      return console.log(err);
    }

    let userId = Meteor.userId();
    Meteor.call('users.setScopes', userId, scopes);
    Meteor.call('users.syncAccessWithGithub');

    if (redirectPath) {
      FlowRouter.go(redirectPath);
    }
  });
}

/**
 * Redirects users to the dashboard if logged in.
 */
export function ensureGuestUser({context}, onData) {
  const {Meteor, FlowRouter} = context();

  if (Meteor.user()) {
    FlowRouter.go('dashboard');
  }

  onData(null, {});
}
