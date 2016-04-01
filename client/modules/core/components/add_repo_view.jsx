import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Promise from 'bluebird';

Promise.config({cancellation: true});

class AddRepoView extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRepo = this.handleAddRepo.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.updateNextPage = this.updateNextPage.bind(this);
    this.state = {searchTerm: ''};
  }

  componentDidMount() {
    const {getReposToAdd} = this.props;
    this.fetchInitialRepos = new Promise(function (resolve, reject) {
      getReposToAdd(1, (err, nextPage) => {
        if (err) {
          return reject(err);
        }

        resolve(nextPage);
      });
    })
    .then((nextPage) => {
      this.setState({nextPage});
    });
  }

  componentWillUnmount() {
    const {clearReposToAdd} = this.props;
    this.fetchInitialRepos.cancel();
    clearReposToAdd();
  }

  handleAddRepo(repo) {
    const {addRepo} = this.props;
    addRepo(repo);
  }

  updateSearchTerm() {
    this.setState({searchTerm: this.refs.repoSearchTerm.value});
  }

  updateNextPage(nextPage) {
    this.setState({nextPage});
  }

  render() {
    const {
      reposToAdd,
      isAddingRepo,
      addScope,
      removeScope,
      currentUser,
      getReposToAdd,
      orgSettingUrl,
      createOrUpdateSubscription,
      stripePublicKey
    } = this.props;

    let klass = classNames('add-repo-container', {'hidden-xs-up': !isAddingRepo});

    return (
      <div className={klass}>
        <div className="add-repo-actions">
          <input type="text"
            ref="repoSearchTerm"
            className="form-control"
            placeholder="Search by repo name or owner name"
            onChange={this.updateSearchTerm} />
          <PrivateRepoToggleBtn addScope={addScope}
            removeScope={removeScope}
            currentScopes={currentUser.scopes} />
          {
            this.state.nextPage ?
            <LoadMoreButton getReposToAdd={getReposToAdd}
              nextPage={this.state.nextPage}
              updateNextPage={this.updateNextPage} /> :
            <span></span>
          }
          <div>
            Missing an org? Add it <a href={orgSettingUrl} target="_blank">
              here
            </a>
          </div>
        </div>

        <ul className="add-repo-list list-unstyled">
          {
            reposToAdd.filter(repo => {
              let searchRegex = new RegExp(_.escapeRegExp(this.state.searchTerm), 'i');
              return searchRegex.test(repo.name) ||
                     searchRegex.test(repo.ownerName);
            }).map(repo => {
              return <RepoItem repo={repo}
                handleAddRepo={this.handleAddRepo}
                createOrUpdateSubscription={createOrUpdateSubscription}
                stripePublicKey={stripePublicKey}
                key={repo._id} />;
            })
          }
        </ul>
      </div>
    );
  }
}

const RepoItem = ({repo, handleAddRepo, createOrUpdateSubscription, stripePublicKey}) => {
  function onAddRepo(e) {
    e.preventDefault();

    if (repo.private) {
      // StripeCheckout is available by external script. Check <head>.
      let checkoutHandler = StripeCheckout.configure({
        key: stripePublicKey,
        localse: 'auto',
        token(token) {
          createOrUpdateSubscription(token, function (err) {
            if (err) {
              return console.log(err);
            }

            handleAddRepo(repo);
          });
        }
      });

      checkoutHandler.open({
        name: 'Private repo',
        amount: 1200,
        currency: 'usd',
        panelLabel: '{{amount}} per month'
      });
    } else {
      handleAddRepo(repo);
    }
  }

  return (
    <li className="add-repo-item">
      <a href="#" onClick={onAddRepo}>
        <div className="repo-name">
          {repo.ownerName} / {repo.name}
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

const PrivateRepoToggleBtn = ({addScope, removeScope, currentScopes}) => {
  function handleAddScope(scopeToAdd, e) {
    e.preventDefault();
    addScope({scopeToAdd});
  }

  function handleRemoveScope(scopeToRemove, e) {
    e.preventDefault();
    removeScope({scopeToRemove});
  }

  if (_.includes(currentScopes, 'repo')) {
    return (
      <a href="#"
        className="btn btn-sm btn-secondary"
        onClick={handleRemoveScope.bind(this, 'repo')}>
        <i className="fa fa-lock"></i> Exclude private repos
      </a>
    );
  } else {
    return (
      <a href="#"
        className="btn btn-sm btn-secondary"
        onClick={handleAddScope.bind(this, 'repo')}>
        <i className="fa fa-lock"></i> Include private repos
      </a>
    );
  }
};

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.loadMoreRepos = this.loadMoreRepos.bind(this);
    this.state = {isLoading: false};
  }

  loadMoreRepos(e) {
    e.preventDefault();
    const {getReposToAdd, nextPage, updateNextPage} = this.props;
    this.setState({isLoading: true});
    getReposToAdd(nextPage, (err, newNextPage) => {
      this.setState({isLoading: false});

      updateNextPage(newNextPage);
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <a href="#"
          className="btn btn-sm btn-secondary disabled">
          <i className="fa fa-spinner fa-spin"></i> Loading...
        </a>
      );
    } else {
      return (
        <a href="#"
          className="btn btn-sm btn-secondary"
          onClick={this.loadMoreRepos}>
          <i className="fa fa-refresh"></i> Load more
        </a>
      );
    }
  }
}

export default AddRepoView;
