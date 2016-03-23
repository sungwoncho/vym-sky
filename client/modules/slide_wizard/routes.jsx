import React from 'react';
import {mount} from 'react-mounter';

import WizardLayout from './components/wizard_layout.jsx';
import Wizard from './containers/wizard';

export default function (injectDeps, {FlowRouter}) {
  const WizardLayoutCtx = injectDeps(WizardLayout);

  FlowRouter.route('/s/:slideDeckUid/wizard', {
    name: 'slide_deck.wizard',
    action({slideDeckUid}, {slideNumber}) {
      mount(WizardLayoutCtx, {
        content: () => (<Wizard slideDeckUid={slideDeckUid}
          currentSlideNumber={parseInt(slideNumber, 10)} />)
      });
    }
  });
}
