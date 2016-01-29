Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        clientId: Meteor.settings.GitHubClientID,
        secret: Meteor.settings.GitHubClientSecret
      }
    }
  );
});
