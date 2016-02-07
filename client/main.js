import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import slidesModule from './modules/slides';

const context = initContext();

const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(slidesModule);
app.init();
