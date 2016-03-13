import {Meteor} from 'meteor/meteor';
import {SlideDecks} from '/lib/collections';

export function generateSeed() {
  if (process.env.NODE_ENV !== 'production' && Meteor.users.find().fetch().length === 0) {

    console.log('generating user seed');

    for (var num = 0; num < 10; num++) {
      Meteor.users.insert({
        username: `user_${num}`,
        email: `user_${num}@test.com`,
        password: 'test1234',
        profile: {name: `user_${num}`},
        services: {
          github: {
            "id" : `${num}`,
            "accessToken" : "825587e4b16d569ded65613b82ca2b4bffc84f6" + num,
            "email" : "",
            "username" : "user" + num,
            "emails" : [ ]
          }
        }
      });
    }

    console.log('generated users');
  }
}
