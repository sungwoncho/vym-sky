import React from 'react';
import classNames from 'classnames';

import SlidesTab from '../containers/repo_slides';
import CollaboratorList from '../containers/collaborator_list';
import {pathFor} from '/client/modules/core/libs/helpers';

let sectionMapping = {
  slides: SlidesTab,
  collaborators: CollaboratorList,
};

const Repo = ({repo, currentSection = 'slides', sectionState}) => {
  let CurrentSection = sectionMapping[currentSection];

  return (
    <div className="container repo">
      <div className="row">
        <div className="col-xs-12">
          <div className="info-container">
            <div className="info">
              <div className="repo-name pull-sm-left">
                <a href={pathFor('repo', {repoName: repo.name, ownerName: repo.owner.name})}>
                  {repo.getFullName()}
                </a>
              </div>
            </div>
          </div>

          <RepoNav currentSection={currentSection}
            repo={repo} />
          <CurrentSection sectionState={sectionState}
            repo={repo} />
        </div>
      </div>
    </div>
  );
};

const RepoNav = ({repo, currentSection}) => {
  function getTabClass(tabName) {
    return classNames('nav-link', {active: currentSection === tabName});
  }

  return (
    <div className="nav-center">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={getTabClass('slides')}
            href={pathFor('repo', {repoName: repo.name, ownerName: repo.owner.name})}>
            Slides</a>
        </li>
        <li className="nav-item">
          <a className={getTabClass('collaborators')}
            href={pathFor('repo', {
              repoName: repo.name, ownerName: repo.owner.name, section: 'collaborators'})}>
            Collaborators</a>
        </li>
      </ul>
    </div>
  );
};

export default Repo;
