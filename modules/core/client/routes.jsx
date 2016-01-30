import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/MainLayout.jsx';
import Welcome from './components/Welcome.jsx';
import Home from './components/Home.jsx';

import { ensureLoggedIn } from './helpers/route_helpers';

FlowRouter.route('/', {
  action: function(params, queryParams) {
    mount(MainLayout, {
      content: <Welcome />
    });
  }
});

FlowRouter.route('/home', {
  triggersEnter: [ensureLoggedIn],
  action: function () {
    mount(MainLayout, {
      content: <Home />
    });
  }
});
