import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from './components/layouts.main.jsx';
import Main from './containers/main';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'main',
    triggersEnter: [
      function (ctx, redirect) {
        if (Meteor.user()) {
          redirect('repos');
        }
      }
    ],
    action: function(params, queryParams) {
      mount(MainLayoutCtx, {
        content: () => (<Main />)
      });
    }
  });
}
