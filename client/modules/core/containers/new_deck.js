import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import NewDeck from '../components/new_deck.jsx';

export const composer = ({context, ownerName, repoName}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('repo', ownerName, repoName).ready()) {
    let query = {name: repoName, 'owner.name': ownerName};
    const repo = Collections.Repos.findOne(query);

    if (Meteor.subscribe('pullRequests', repo._id).ready()) {
      const pullRequests = Collections.PullRequests.find(
        {repoId: repo._id},
        {sort: {number: -1}}
      ).fetch();

      onData(null, {repo, pullRequests});
    }
  }
};

export const depsMapper = (context, actions) => ({
  syncPullRequests: actions.pull_requests.syncPullRequests,
  createDeck: actions.slide_decks.createSlideDeck,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewDeck);
