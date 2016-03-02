import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import WizardLayout from './components/layouts.wizard.jsx';
import Wizard from './containers/wizard';

import {ensureLoggedIn} from '/client/modules/core/libs/helpers';

export default function (injectDeps, {FlowRouter}) {
  const WizardLayoutCtx = injectDeps(WizardLayout);

  FlowRouter.route('/s/:slideDeckUid/wizard', {
    name: 'slide_deck.wizard',
    triggersEnter: [ensureLoggedIn],
    action: function ({slideDeckUid}, {slideNumber}) {
      mount(WizardLayoutCtx, {
        content: () => (<Wizard slideDeckUid={slideDeckUid}
          currentSlideNumber={parseInt(slideNumber)} />)
      });
    }
  });
}
