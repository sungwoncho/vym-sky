import React from 'react';
import {mount} from 'react-mounter';

import SlideEngine from './containers/slide_engine';

export default function (injectDeps, {FlowRouter}) {
  const SlideEngineCtx = injectDeps(SlideEngine);

  FlowRouter.route('/s/:slideDeckUid', {
    name: 'slide_deck',
    action({slideDeckUid}) {
      mount(() => (<SlideEngineCtx slideDeckUid={slideDeckUid} />));
    }
  });
}
