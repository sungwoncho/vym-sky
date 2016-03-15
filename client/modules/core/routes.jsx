import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from './components/layout_main.jsx';
import Main from './containers/main';
import Home from './containers/home';
import Repo from './containers/repo';
import NewDeck from './containers/new_deck';
import Settings from './containers/settings';

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
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Main />)
      });
    }
  });

  FlowRouter.route('/home', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
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

  FlowRouter.route('/r/:ownerName/:repoName', {
    name: 'repo',
    action({ownerName, repoName}) {
      mount(MainLayoutCtx, {
        content: () => (<Repo ownerName={ownerName} repoName={repoName} />)
      });
    }
  });

  FlowRouter.route('/r/:ownerName/:repoName/new', {
    name: 'slide_deck.new',
    action({ownerName, repoName}) {
      mount(MainLayoutCtx, {
        content: () => (<NewDeck ownerName={ownerName} repoName={repoName} />)
      });
    }
  });
}
