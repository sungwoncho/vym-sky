import {Mongo} from 'meteor/mongo';

// Local collection
const PullRequests = new Mongo.Collection(null);

PullRequests.helpers({
  getFullTitle() {
    return `#${this.number} / ${this.title}`;
  }
});

export default PullRequests;
