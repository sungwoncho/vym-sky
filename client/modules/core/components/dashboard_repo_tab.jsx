import React from 'react';

import RepoList from './repo_list.jsx';
import AddRepoView from '../containers/add_repo_view';

class RepoTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAddingRepo: false};
    this.toggleIsAddingRepo = this.toggleIsAddingRepo.bind(this);
  }

  toggleIsAddingRepo(e) {
    e.preventDefault();
    this.setState({isAddingRepo: !this.state.isAddingRepo});
  }

  render() {
    let {repos} = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8 col-lg-offset-2">
          <div className="section-subheading">
            <div>
              <h4>Your repos</h4>
            </div>
            <small className="text-muted">
              These are the repos you have access to
            </small>
          </div>

          <RepoList repos={repos} />

          <a href="#"
            onClick={this.toggleIsAddingRepo} >
            {
              this.state.isAddingRepo ?
              <div>
                <i className="fa fa-minus-circle"></i> Show less
              </div> :
              <div>
                <i className="fa fa-plus-circle"></i> Add repos
              </div>
            }
          </a>
          <AddRepoView isAddingRepo={this.state.isAddingRepo} />
        </div>
      </div>
    );
  }
}

export default RepoTab;
