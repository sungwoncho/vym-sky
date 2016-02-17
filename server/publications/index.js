import slideDecks from './slide_decks';
import repos from './repos';
import pullRequests from './pull_requests';
import users from './users';

export default function () {
  slideDecks();
  repos();
  pullRequests();
  users();
}
