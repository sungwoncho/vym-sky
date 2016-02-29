import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Local collection
const Files = new Mongo.Collection(null);

// let schema = new SimpleSchema({
//
// });
//
// Files.attachSchema(schema);

export default Files;
