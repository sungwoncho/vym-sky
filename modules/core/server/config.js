Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        clientId: Meteor.settings.githubClientID,
        secret: Meteor.settings.githubClientSecret
      }
    }
  );
});
