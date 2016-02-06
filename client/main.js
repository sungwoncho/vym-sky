import {createApp} from 'mantra-core';
import {initContext} from './configs/context';

// modules
import coreModule from './modules/core';

const context = initContext();

const app = createApp(context);
app.loadModule(coreModule);
app.init();
