import React from 'react';
import {injectDeps} from 'react-simple-di';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import MainLayout from '../components/layouts.main/index.jsx';
import Welcome from '../containers/welcome';
import Home from '../containers/home';

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);

  FlowRouter.route('/', {
    action: function(params, queryParams) {
      mount(MainLayoutCtx, {
        content: () => (<Welcome />)
      });
    }
  });

  FlowRouter.route('/home', {
    triggersEnter: [context.routeHelpers.ensureLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
};
