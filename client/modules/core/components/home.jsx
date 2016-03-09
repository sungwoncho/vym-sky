import React from 'react';

import RepoList from './repo_list.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

const Home = ({repos, currentUser}) => (
  <div className="container home">
    <div className="row">
      <div className="col-sm-3">
        <ProfileInfo user={currentUser} />
        <RepoList repos={repos} />
      </div>
      <div className="col-sm-9">
        presentations
      </div>
    </div>
  </div>
);

const ProfileInfo = ({user}) => {
  function getAvatarUrl() {
    const baseUrl = 'https://avatars.githubusercontent.com';

    return `${baseUrl}/${user.services.github.username}?s=300`;
  }

  return (
    <div>
      <img src={getAvatarUrl()} alt="github-avatar"
        className="github-avatar" />
      <h4>{user.profile.name}</h4>
      <h5 className="text-muted">{user.services.github.username}</h5>
    </div>
  );
};

export default Home;
