export default {
  ensureLoggedIn(context, redirect) {
    if (! Meteor.userId()) {
      redirect('/');
    }
  }
};
