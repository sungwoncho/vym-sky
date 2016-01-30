import {Mongo} from 'meteor/mongo';

export default {
  PullRequests: new Mongo.Collection('pullRequests'),
  Repos: new Mongo.Collection('repos'),
  Presentations: new Mongo.Collection('presentations'),
  SlideDecks: new Mongo.Collection('slideDecks')
};
