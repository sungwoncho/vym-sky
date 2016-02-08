import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import slidesModule from './modules/slides';
import repoModule from './modules/repos';

const context = initContext();
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(slidesModule);
app.loadModule(repoModule);
app.init();
