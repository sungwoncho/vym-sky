import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import SlideEngine from './containers/slide_engine';

export default function (injectDeps, {FlowRouter}) {
  const SlideEngineCtx = injectDeps(SlideEngine);

  FlowRouter.route('/s/:slideDeckUid', {
    name: 'slide_deck',
    action: function({slideDeckUid}) {
      mount(() => (<SlideEngineCtx slideDeckUid={slideDeckUid} />));
    }
  });
}
