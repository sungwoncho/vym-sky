import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _ from 'lodash';

const SlideDecks = new Mongo.Collection('slideDecks');

let schema = new SimpleSchema({
  prId: {
    type: String
  },
  // _id of the user that owns the slide deck
  ownerId: {
    type: String
  },
  title: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  currentSlide: {
    type: Number,
    optional: true,
    defaultValue: 1
  },
  slides: {
    type: [Object],
    optional: true,
    defaultValue: []
  },
  'slides.$.uid': {
    type: String
  },
  'slides.$.number': {
    type: Number
  },
  'slides.$.type': {
    type: String,
    optional: true
  },
  'slides.$.data': {
    type: Object,
    blackbox: true,
    optional: true
  },
  'slides.$.data.title': {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (! this.isInsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

SlideDecks.attachSchema(schema);

SlideDecks.helpers({
  getCurrentSlide() {
    let currentSlideNumber = this.currentSlide;

    return this.slides[currentSlideNumber - 1];
  },
  getSlideByNumber(number) {
    return _.find(this.slides, {number: number});
  },
  getLastSlide() {
    let slides = this.slides;

    return slides[slides.length - 1];
  }
});

export default SlideDecks;
