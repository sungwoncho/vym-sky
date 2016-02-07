import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from './components/layouts.main/index.jsx';
import Main from './containers/main';
import Home from './containers/home';

import routeHelpers from './libs/routeHelpers';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'main',
    triggersEnter: [
      function (ctx, redirect) {
        if (Meteor.user()) {
          redirect('home');
        }
      }
    ],
    action: function(params, queryParams) {
      mount(MainLayoutCtx, {
        content: () => (<Main />)
      });
    }
  });

  FlowRouter.route('/home', {
    name: 'home',
    triggersEnter: [routeHelpers.ensureLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
