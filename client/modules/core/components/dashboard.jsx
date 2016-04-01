import React from 'react';

import Nav from './nav.jsx';
import SlideDeckList from './slide_deck_list.jsx';
import RepoTab from './dashboard_repo_tab.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

const Dashboard = ({currentSection = 'repos', slideDecks, repos, currentUser}) => {
  let dashboardTabs = [
    {
      name: 'repos',
      href: pathFor('dashboard', {section: 'repos'})
    },
    {
      name: 'slides',
      href: pathFor('dashboard', {section: 'slides'})
    }
  ];

  return (
    <div className="container home">
      <div className="row">
        <div className="col-xs-12">
          <Nav tabs={dashboardTabs}
            currentTabName={currentSection} />
          {
            currentSection === 'slides' ?
              <SlideDeckList slideDecks={slideDecks} currentUser={currentUser} /> :
            currentSection === 'repos' ? <RepoTab repos={repos} /> :
            <span>No such tab, Jose.</span>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
