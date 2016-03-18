import React from 'react';

const RepoManagement = ({repos, toggleActivatedStatus}) => {
  // function handleSyncRepos(e) {
  //   e.preventDefault();
  //   syncRepos();
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">

        </div>
      </div>
    </div>
  );
};

const RepoList = ({repos, toggleActivatedStatus}) => (
  <ul>
    {
      repos.map(function(repo) {
        return <RepoItem key={repo._id}
          repo={repo}
          toggleActivatedStatus={toggleActivatedStatus} />;
      })
    }
  </ul>
);

const RepoItem = ({repo, toggleActivatedStatus}) => {

  function onToggleActivated(e) {
    e.preventDefault();

    toggleActivatedStatus(repo._id);
  }

  return (
    <li className="repo-item row">
      <div className="col-sm-10">
        <span>
          {repo.ownerName} / {repo.name}
        </span>
        <p className="repo-item-description">
          {repo.description}
        </p>
      </div>
      <div className="col-sm-2">
        <a href="#"
          onClick={onToggleActivated}
          className="pull-right btn btn-secondary">
          {
            repo.activated ? 'Remove' : 'Activate'
          }
        </a>
      </div>
    </li>
  );
};

export default RepoManagement;
