import publications from './publications';
import methods from './methods';
import {listenToWebhook} from './configs/webhook';
import {configureGithubOauth} from './configs/oauth';
import {generateSeed} from './configs/seed';

publications();
methods();
listenToWebhook();
configureGithubOauth();

if (process.env.NODE_ENV !== 'production') {
  // generateSeed();
}
