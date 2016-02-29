import presentations from './presentations';
import pullRequests from './pull_requests';
import repos from './repos';
import slideDeck from './slide_deck';
import users from './users';
import files from './files';

export default function () {
  presentations();
  pullRequests();
  repos();
  slideDeck();
  users();
  files();
}
