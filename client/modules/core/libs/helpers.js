import {FlowRouter} from 'meteor/kadira:flow-router';

export function pathFor (pathName, params) {
  let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};

  return FlowRouter.path( pathName, params, query );
}

export function urlFor (pathName, params) {
  let path = pathFor(pathName, params);

  return Meteor.absoluteUrl(path);
}

// Used in Flow Router's triggersEnter
export function ensureLoggedIn (context, redirect) {
  if (! Meteor.userId()) {
    redirect('/');
  }
}
