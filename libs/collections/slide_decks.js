import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const SlideDecks = new Mongo.Collection('slideDecks');

let schema = new SimpleSchema({
  presentationId: {
    type: String
  },
  slides: {
    type: [Object],
    optional: true
  },
  currentSlide: {
    type: Number,
    optional: true
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

export default SlideDecks;
