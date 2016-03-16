import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

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
    const {repos, isAddingRepo} = this.props;
    let klass = classNames('add-repo-container', {'hidden-xs-up': !isAddingRepo});

    return (
      <div className={klass}>
        <div className="add-repo-actions">
          <input type="text"
            ref="repoSearchTerm"
            className="form-control"
            placeholder="Search by repo name or owner name"
            onChange={this.updateSearchTerm} />
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

export default AddRepoView;
