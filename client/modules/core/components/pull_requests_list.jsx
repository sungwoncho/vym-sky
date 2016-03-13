import React from 'react';

const PullRequestList = ({pullRequests, createDeck}) => (
  <ul className="list-unstyled">
    {
      pullRequests.map((pr) => {
        return (
          <PullRequestItem pullRequest ={pr}
            createDeck={createDeck}
            key={pr._id} />
        );
      })
    }
  </ul>
);

const PullRequestItem = ({}) => (
  <li className="pr-item">
    <a href="#" className="pr-item-link" onClick={this.handleCreateDeck}>
      {pullRequest.number} / {pullRequest.title}
    </a>
  </li>
);

export default PullRequestList;
