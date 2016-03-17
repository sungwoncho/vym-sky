import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

class AddRepoView extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRepo = this.handleAddRepo.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.state = {searchTerm: ''};
  }

  handleAddRepo(repo) {
    const {toggleActivatedStatus} = this.props;
    toggleActivatedStatus(repo._id);
  }

  updateSearchTerm() {
    this.setState({searchTerm: this.refs.repoSearchTerm.value});
  }

  render() {
    const {repos, isAddingRepo, githubAuth, currentUser, syncRepos, orgSettingUrl} = this.props;
    let klass = classNames('add-repo-container', {'hidden-xs-up': !isAddingRepo});

    return (
      <div className={klass}>
        <div className="add-repo-actions">
          <input type="text"
            ref="repoSearchTerm"
            className="form-control"
            placeholder="Search by repo name or owner name"
            onChange={this.updateSearchTerm} />
          <PrivateRepoToggleBtn githubAuth={githubAuth}
            currentScopes={currentUser.scopes} />
          <SyncRepoBtn syncRepos={syncRepos} />
          <div>
            Missing an org? Add it <a href={orgSettingUrl} target="_blank">
              here
            </a>
          </div>
          <div>
            Last synced:
            {moment(currentUser.reposLastSyncedAt).fromNow()}
          </div>
        </div>

        <ul className="add-repo-list list-unstyled">
          {
            repos.filter(repo => {
              let searchRegex = new RegExp(_.escapeRegExp(this.state.searchTerm), 'i');
              return searchRegex.test(repo.name) ||
                     searchRegex.test(repo.owner.name);
            }).map(repo => {
              return <RepoItem repo={repo}
                handleAddRepo={this.handleAddRepo}
                key={repo._id} />;
            })
          }
        </ul>
      </div>
    );
  }
}

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

const PrivateRepoToggleBtn = ({githubAuth, currentScopes}) => {
  function updateAuthScope(scopes, e) {
    e.preventDefault();
    githubAuth({scopes});
  }

  if (_.includes(currentScopes, 'repo')) {
    return (
      <a href="#"
        className="btn btn-sm btn-secondary"
        onClick={updateAuthScope.bind(this, [ 'public_repo' ])}>
        <i className="fa fa-lock"></i> Exclude private repos
      </a>
    );
  } else {
    return (
      <a href="#"
        className="btn btn-sm btn-secondary"
        onClick={updateAuthScope.bind(this, [ 'repo' ])}>
        <i className="fa fa-lock"></i> Include private repos
      </a>
    );
  }
};

class SyncRepoBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSyncRepos = this.handleSyncRepos.bind(this);
    this.state = {isSyncing: false};
  }

  handleSyncRepos(e) {
    e.preventDefault();
    const {syncRepos} = this.props;
    this.setState({isSyncing: true});
    syncRepos((err, res) => {
      console.log('result', res);
      if (err) {
        console.error(err);
      }
      this.setState({isSyncing: false});
    });
  }

  render() {
    if (this.state.isSyncing) {
      return (
        <a href="#"
          className="btn btn-sm btn-secondary disabled">
          <i className="fa fa-spinner fa-spin"></i>
        </a>
      );
    } else {
      return (
        <a href="#"
          className="btn btn-sm btn-secondary"
          onClick={this.handleSyncRepos}>
          <i className="fa fa-refresh"></i> Sync
        </a>
      );
    }
  }
};

export default AddRepoView;
