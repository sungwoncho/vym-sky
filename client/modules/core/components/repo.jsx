import React from 'react';

import SlidesTab from '../containers/repo_slides';
import CollaboratorList from '../containers/collaborator_list';
import Nav from './nav.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

let sectionMapping = {
  slides: SlidesTab,
  collaborators: CollaboratorList,
};

const Repo = ({repo, currentSection = 'slides', sectionState}) => {
  let repoTabs = [
    {
      name: 'slides',
      href: pathFor('repo', {repoName: repo.name, ownerName: repo.ownerName})
    },
    {
      name: 'collaborators',
      href: pathFor('repo', {
        repoName: repo.name, ownerName: repo.ownerName, section: 'collaborators'})
    }
  ];
  let CurrentSection = sectionMapping[currentSection];

  return (
    <div className="container repo">
      <div className="row">
        <div className="col-xs-12">
          <div className="info-container">
            <div className="info">
              <div className="repo-name pull-sm-left">
                <a href={pathFor('repo', {repoName: repo.name, ownerName: repo.ownerName})}>
                  {repo.getFullName()}
                </a>
              </div>
            </div>
          </div>

          <Nav tabs={repoTabs}
            currentTabName={currentSection} />
          <CurrentSection sectionState={sectionState}
            repo={repo} />
        </div>
      </div>
    </div>
  );
};

export default Repo;
