import {listenToWebhook} from './configs/webhook';
import {configureGithubOauth} from './configs/oauth';

listenToWebhook();
configureGithubOauth();
