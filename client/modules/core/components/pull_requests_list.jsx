import React from 'react';

const PullRequestList = ({pullRequests, onSelectPullRequest}) => (
  <ul className="list-unstyled">
    {
      pullRequests.map((pr) => {
        return (
          <PullRequestItem pullRequest ={pr}
            onSelectPullRequest={onSelectPullRequest}
            key={pr._id} />
        );
      })
    }
  </ul>
);

const PullRequestItem = ({pullRequest, onSelectPullRequest}) => {
  function handleSelect(pr, e) {
    e.preventDefault();
    onSelectPullRequest(pr);
  }

  return (
    <li className="pr-item">
      <a href="#" className="pr-item-link" onClick={handleSelect.bind(this, pullRequest)}>
        {pullRequest.number} / {pullRequest.title}
      </a>
    </li>
  );
};

export default PullRequestList;
