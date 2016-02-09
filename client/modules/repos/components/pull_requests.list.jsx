import React from 'react';

import PullRequestItem from './pull_requests.item.jsx';

export default React.createClass({
  render() {
    return (
      <ul className="list-unstyled">
        {this.renderPullRequestItems()}
      </ul>
    );
  },

  renderPullRequestItems() {
    const {pullRequests, createDeck} = this.props;

    return pullRequests.map((pr) => {
      return (
        <PullRequestItem pullRequest ={pr}
          createDeck={createDeck}
          key={pr._id} />
      );
    });
  }
});
