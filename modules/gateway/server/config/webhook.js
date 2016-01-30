import createHandler from 'github-webhook-handler';

var handler = createHandler({
  path: '/',
  secret: Meteor.settings.GithubWebhookSecret
});

WebApp.connectHandlers.use('/webhook', function (req, res, next) {
  if (req.method.toLowerCase() !== 'post') {
    next();
    return;
  }

  handler(req, res, Meteor.bindEnvironment(function (err) {
    // Never called if successfully handled
    console.error('Error in webhook handler:', err);

    res.statusCode = 404;
    res.end(err);
  }));
});

handler.on('pull_request', Meteor.bindEnvironment(function (event) {

}));
