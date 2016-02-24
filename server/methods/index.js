import presentations from './presentations';
import pullRequests from './pull_requests';
import repos from './repos';
import slideDeck from './slide_deck';
import users from './users';

export default function () {
  presentations();
  pullRequests();
  repos();
  slideDeck();
  users();
}
