export default {
  getPullRequests({Meteor, Collections}, ownerName, repoName, page, done) {
    Meteor.call('pullRequests.getAll', ownerName, repoName, page, function (err, res) {
      res.pullRequests.forEach(pr => {
        Collections.PullRequests.insert(pr);
      });

      if (done) {
        done(null, res.nextPage);
      }
    });
  }
};
