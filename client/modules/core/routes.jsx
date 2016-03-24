import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from './components/layout_main.jsx';
import Main from './containers/main';
import Dashboard from './containers/dashboard';
import Repo from './containers/repo';
import Settings from './containers/settings';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Main />)
      });
    }
  });

  FlowRouter.route('/dashboard/:section?', {
    name: 'dashboard',
    action({section}) {
      mount(MainLayoutCtx, {
        content: () => (<Dashboard currentSection={section} />)
      });
    }
  });

  FlowRouter.route('/settings/:section?', {
    name: 'settings',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<Settings currentSection={params.section} />)
      });
    }
  });

  FlowRouter.route('/r/:ownerName/:repoName/:section?/:sectionState?', {
    name: 'repo',
    action({ownerName, repoName, section, sectionState}) {
      mount(MainLayoutCtx, {
        content: () => (<Repo ownerName={ownerName}
          repoName={repoName}
          currentSection={section}
          sectionState={sectionState} />)
      });
    }
  });
}
