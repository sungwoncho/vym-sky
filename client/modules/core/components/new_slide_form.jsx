import React from 'react';

import PullRequestsList from '../containers/pull_requests_list';

class NewSlideForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {targetPullRequest: null};
    this.handleSelectPullRequest = this.handleSelectPullRequest.bind(this);
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
  }

  handleSelectPullRequest(pr) {
    this.setState({targetPullRequest: pr});
  }

  handleCreateDeck(e) {
    e.preventDefault();
    const {repo, createDeck} = this.props;
    let title = this.refs.slideDeckTitle.value;
    let targetPullRequest = this.state.targetPullRequest;

    if (!title) {
      return console.error('Please set title');
    }

    if (!targetPullRequest) {
      return console.error('Please select pull request');
    }

    createDeck(repo._id, targetPullRequest._id, title);
  }

  render() {
    let {repo} = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8 col-lg-offset-2">
          <h2>New slide deck</h2>

          <label>
            Slide deck title
            <input type="text" ref="slideDeckTitle" placeholder="Title" />
          </label>

          <PullRequestsList repo={repo}
            onSelectPullRequest={this.handleSelectPullRequest} />

          <a href="#" className="btn btn-md btn-success" onClick={this.handleCreateDeck}>Create</a>
        </div>
      </div>
    );
  }
}

export default NewSlideForm;
