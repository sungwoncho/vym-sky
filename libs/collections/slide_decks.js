import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const SlideDecks = new Mongo.Collection('slideDecks');

let schema = new SimpleSchema({
  presentationId: {
    type: String
  },
  currentSlide: {
    type: Number,
    optional: true,
    defaultValue: 1
  },
  slides: {
    type: [Object],
    optional: true
  },
  'slides.$.number': {
    type: String
  },
  'slides.$.type': {
    type: String
  },
  'slides.$.data': {
    type: Object,
    blackbox: true
  },
  'slides.$.data.title': {
    type: String,
    optional: true
  }
});

SlideDecks.attachSchema(schema);

SlideDecks.helpers({
  getCurrentSlide() {
    let currentSlideNumber = this.currentSlide;

    return this.slides[currentSlideNumber - 1];
  }
});

export default SlideDecks;
