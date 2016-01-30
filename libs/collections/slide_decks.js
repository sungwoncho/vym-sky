import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const SlideDecks = new Mongo.Collection('slide_decks');

let schema = new SimpleSchema({
  presentationId: {
    type: String
  }
});

SlideDecks.attachSchema(schema);

export default SlideDecks;
