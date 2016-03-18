import React from 'react';
import classNames from 'classnames';

const PullRequestList = (
  {pullRequests, onSelectPullRequest, selectedPr}) => {

  return (
    <div>
      <ul className="list-unstyled">
        {
          pullRequests.map((pr) => {
            let isSelected = selectedPr ? pr.number === selectedPr.number : false;

            return (
              <PullRequestItem pullRequest ={pr}
                onSelectPullRequest={onSelectPullRequest}
                isSelected={isSelected}
                key={pr._id} />
            );
          })
        }
      </ul>
    </div>
  );
};

const PullRequestItem = ({pullRequest, onSelectPullRequest, isSelected}) => {
  function handleSelect(pr, e) {
    e.preventDefault();
    onSelectPullRequest(pr);
  }

  let itemClass = classNames('pr-item', 'row', {
    active: isSelected
  });

  return (
    <li className={itemClass}>
      <div className="col-md-8 col-sm-7 col-xs-12">
        #{pullRequest.number} - {pullRequest.title}
      </div>
      <div className="col-md-4 col-sm-5 col-xs-12">
        <a href="#" className="btn btn-sm btn-secondary"
          onClick={handleSelect.bind(this, pullRequest)}>
          Choose
        </a>
        <a href={pullRequest.htmlUrl} target="_blank" className="btn btn-sm btn-secondary">
          View on GitHub
        </a>
      </div>
    </li>
  );
};

export default PullRequestList;
