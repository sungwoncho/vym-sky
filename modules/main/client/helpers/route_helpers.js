export function ensureLoggedIn(context, redirect) {
  if (! Meteor.userId()) {
    redirect('/');
  }
}
