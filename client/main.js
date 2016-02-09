import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import repoModule from './modules/repos';
import slideEngineModule from './modules/slide_engine';
import slideWizardModule from './modules/slide_wizard';

const context = initContext();
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(slideEngineModule);
app.loadModule(slideWizardModule);
app.loadModule(repoModule);
app.init();
