export default {
  login({Meteor, FlowRouter}) {
    Meteor.loginWithGithub({
      requestPermissions: ['public_repo']
    }, function (err) {
      if (err) {
        return console.log(err);
      }

      FlowRouter.go('home');
    });
  },

  logout({Meteor, FlowRouter}) {
    Meteor.logout(function (err) {
      if (err) {
        return console.log(err);
      }

      FlowRouter.go('main');
    });
  }
};
