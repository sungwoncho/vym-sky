import publications from './publications';
import {listenToWebhook} from './configs/webhook';
import {configureGithubOauth} from './configs/oauth';
import {generateSeed} from './configs/seed';

publications();
listenToWebhook();
configureGithubOauth();

if (process.env.NODE_ENV !== 'production') {
  generateSeed();
}
