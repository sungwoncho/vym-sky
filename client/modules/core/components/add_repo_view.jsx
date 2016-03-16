import React from 'react';
import classNames from 'classnames';

const AddRepoView = ({isAddingRepo = false, repos, toggleActivatedStatus}) => {
  let klass = classNames('add-repo-container', {'hidden-xs-up': !isAddingRepo});

  function handleAddRepo(repo) {
    toggleActivatedStatus(repo._id);
  }

  return (
    <div className={klass}>
      <ul className="add-repo-list list-unstyled">
        {
          repos && repos.map(repo => {
            return <RepoItem repo={repo}
              handleAddRepo={handleAddRepo}
              key={repo._id} />;
          })
        }
      </ul>
    </div>
  );
};

const RepoItem = ({repo, handleAddRepo}) => {
  function onAddRepo(e) {
    e.preventDefault();
    handleAddRepo(repo);
  }

  return (
    <li className="add-repo-item">
      <a href="#" onClick={onAddRepo}>
        <div className="repo-name">
          {repo.owner.name} / {repo.name}
        </div>
        {
          repo.private ? <span className="label label-warning">private</span> :
          <span></span>
        }
        {
          repo.fork ? <span className="label label-default">fork</span> :
          <span></span>
        }
      </a>
    </li>
  );
};

export default AddRepoView;
