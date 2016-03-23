import publications from './publications';
import methods from './methods';
import {listenToWebhook} from './configs/webhook';
import {configureGithubOauth} from './configs/oauth';
import {generateSeed} from './configs/seed';
import {setupUserHook} from './configs/users';

publications();
methods();
listenToWebhook();
configureGithubOauth();
setupUserHook();

if (process.env.NODE_ENV !== 'production') {
  generateSeed();
}
