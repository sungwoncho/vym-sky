import {Mongo} from 'meteor/mongo';

// Local collection
const PullRequests = new Mongo.Collection(null);

PullRequests.helpers({
  getFullTitle() {
    return `#${this.number} / ${this.title}`;
  }
});

DEBUG_PR = PullRequests;

export default PullRequests;
