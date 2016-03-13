import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from './components/layouts.main.jsx';
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
    action: function(params, queryParams) {
      mount(MainLayoutCtx, {
        content: () => (<Main />)
      });
    }
  });

  FlowRouter.route('/home', {
    name: 'home',
    action: function () {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/settings/:section?', {
    name: 'settings',
    action: function(params) {
      mount(MainLayoutCtx, {
        content: () => (<Settings currentSection={params.section} />)
      });
    }
  });

  FlowRouter.route('/r/:ownerName/:repoName', {
    name: 'repo',
    action: function ({ownerName, repoName}) {
      mount(MainLayoutCtx, {
        content: () => (<Repo ownerName={ownerName} repoName={repoName} />)
      });
    }
  });

  FlowRouter.route('/s/new', {
    name: 'slide_deck.new',
    action: function ({}, {ownerName, repoName}) {
      mount(MainLayoutCtx, {
        content: () => (<NewDeck ownerName={ownerName} repoName={repoName} />)
      });
    }
  });
}
