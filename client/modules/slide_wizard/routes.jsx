import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from '/client/modules/core/components/layouts.main.jsx';
import Wizard from './containers/wizard';

import {ensureLoggedIn} from '/client/modules/core/libs/helpers';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/s/:slideDeckId/wizard', {
    name: 'slide_deck.wizard',
    triggersEnter: [ensureLoggedIn],
    action: function ({slideDeckId}, {slideNumber}) {
      mount(MainLayoutCtx, {
        content: () => (<Wizard slideDeckId={slideDeckId} slideNumber={slideNumber} />)
      });
    }
  });
}
