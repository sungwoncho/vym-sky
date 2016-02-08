import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from '../core/components/layouts.main.jsx';
import Repos from './containers/repos';
import ManageRepo from './containers/repos.manage';

import {ensureLoggedIn} from '/client/modules/core/libs/helpers';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/repos', {
    name: 'repos',
    triggersEnter: [ensureLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<Repos />)
      });
    }
  });

  FlowRouter.route('/repos/manage', {
    name: 'repos.manage',
    triggersEnter: [ensureLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<ManageRepo />)
      });
    }
  });
}
