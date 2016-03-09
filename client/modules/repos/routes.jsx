import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from '../core/components/layouts.main.jsx';
//import Repos from './containers/repos';
//import Repo from './containers/repo';
//import ManageRepo from './containers/repos.manage';
//import NewDeck from './containers/decks.new';
//
//import {ensureLoggedIn} from '/client/modules/core/libs/helpers';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  //  FlowRouter.route('/r/manage', {
  //    name: 'repos.manage',
  //    triggersEnter: [ensureLoggedIn],
  //    action: function () {
  //      mount(MainLayoutCtx, {
  //        content: () => (<ManageRepo />)
  //      });
  //    }
  //  });
  //
  //  FlowRouter.route('/r/:ownerName/:repoName', {
  //    name: 'repo',
  //    triggersEnter: [ensureLoggedIn],
  //    action: function ({ownerName, repoName}) {
  //      mount(MainLayoutCtx, {
  //        content: () => (<Repo ownerName={ownerName} repoName={repoName} />)
  //      });
  //    }
  //  });
  //
  //  FlowRouter.route('/r/:ownerName/:repoName/decks/new', {
  //    name: 'decks.new',
  //    triggersEnter: [ensureLoggedIn],
  //    action: function ({ownerName, repoName}) {
  //      mount(MainLayoutCtx, {
  //        content: () => (<NewDeck ownerName={ownerName} repoName={repoName} />)
  //      });
  //    }
  //  });
}
