import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/layout_main.jsx';
import HomeLayout from './components/layout_home.jsx';
import Home from './containers/home';
import Features from './components/features.jsx';
import Dashboard from './containers/dashboard';
import Repo from './containers/repo';
import Settings from './containers/settings';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const HomeLayoutCtx = injectDeps(HomeLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(HomeLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/features', {
    name: 'features',
    action() {
      mount(HomeLayoutCtx, {
        content: () => (<Features />)
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
