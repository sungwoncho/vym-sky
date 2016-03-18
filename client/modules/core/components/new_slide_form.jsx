import React from 'react';
import Promise from 'bluebird';

import PullRequestsList from '../containers/pull_requests_list';

Promise.config({cancellation: true});

class NewSlideForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {targetPullRequest: null};
    this.handleSelectPullRequest = this.handleSelectPullRequest.bind(this);
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
  }

  componentDidMount() {
    const {repo, getPullRequests} = this.props;
    this.fetchInitialPrs = new Promise(function (resolve, reject) {
      getPullRequests(repo.ownerName, repo.name, 1, (err, nextPage) => {
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
    this.fetchInitialPrs.cancel();
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
    let {pullRequests} = this.props;

    function getFullTitle(pr) {
      if (pr) {
        return pr.getFullTitle();
      } else {
        return 'Not selected';
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8 col-lg-offset-2">
          <div className="sd-form">
            <div className="section-subheading">
              <h4>Create a new slide deck</h4>
              <small className="text-muted">
                A slide deck is based on a pull request and can be organized in any way you want.
              </small>
            </div>

            <div className="sd-form-section">
              <fieldset className="form-group">
                <label htmlFor="sd-title">Slide Deck title</label>
                <input type="text"
                  className="form-control"
                  id="sd-title"
                  ref="slideDeckTitle" />
                <small className="text-muted">
                  This is what you will see in the slide list
                </small>
              </fieldset>

              <fieldset className="form-group">
                <label>Pull Request</label>
                <input type="text"
                  className="form-control"
                  disabled
                  value={getFullTitle(this.state.targetPullRequest)}/>
                <small className="text-muted">
                  Please choose a pull request from the list below
                </small>
              </fieldset>

              <PullRequestsList pullRequests={pullRequests}
                onSelectPullRequest={this.handleSelectPullRequest}
                selectedPr={this.state.targetPullRequest} />
            </div>

            <a href="#"
              className="btn btn-md btn-success"
              onClick={this.handleCreateDeck}>Create</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewSlideForm;
