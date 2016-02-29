export default {
  getFiles({Meteor, Collections}, pullRequestId) {
    Meteor.call('files.getAll', pullRequestId, function (err, fileDocs) {
      fileDocs.forEach(function (fileDoc) {
        Collections.Files.insert(fileDoc); // Insert to local collection
      });
    });
  }
};
