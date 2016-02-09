import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import SlideEngine from './containers/slide_engine';

export default function (injectDeps, {FlowRouter}) {
  const SlideEngineCtx = injectDeps(SlideEngine);

  FlowRouter.route('/slides/:slideDeckId', {
    name: 'slide-deck',
    action: function({slideDeckId}) {
      mount(() => (<SlideEngineCtx slideDeckId={slideDeckId} />));
    }
  });
}
