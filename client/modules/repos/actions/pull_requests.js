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
  },

  getSinglePullRequest({Meteor, Collections}, ownerName, repoName, prNumber) {
    Meteor.call('pullRequests.getOne', ownerName, repoName, prNumber, function (err, pr) {
      // Add custom attributes to make query easier
      pr.repoName = repoName;
      pr.ownerName = ownerName;

      Collections.PullRequests.insert(pr);
    });
  }
};
