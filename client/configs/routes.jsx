import React from 'react';
import {injectDeps} from 'react-simple-di';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '../components/layouts.main/index.jsx';
import Main from '../containers/main';
import Home from '../containers/home';

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);

  FlowRouter.route('/', {
    name: 'main',
    triggersEnter: [
      function (ctx, redirect) {
        if (context.Meteor.user()) {
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
    triggersEnter: [context.routeHelpers.ensureLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
};
