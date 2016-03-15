import React from 'react';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';

import MainLayout from '../core/components/layout_main.jsx';
//import Repos from './containers/repos';
//import Repo from './containers/repo';
//import ManageRepo from './containers/repos.manage';
//import NewDeck from './containers/new_deck';
//
//import {ensureLoggedIn} from '/client/modules/core/libs/helpers';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

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
  //  FlowRouter.route('/r/:ownerName/:repoName/new_deck', {
  //    name: 'new_deck',
  //    triggersEnter: [ensureLoggedIn],
  //    action: function ({ownerName, repoName}) {
  //      mount(MainLayoutCtx, {
  //        content: () => (<NewDeck ownerName={ownerName} repoName={repoName} />)
  //      });
  //    }
  //  });
}
