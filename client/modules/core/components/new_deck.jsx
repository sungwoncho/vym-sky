import React from 'react';

import PullRequestList from '/client/modules/repos/components/pull_requests.list.jsx';
import SyncButton from '/client/modules/repos/components/pull_requests.button.sync.jsx';

export default React.createClass({
  render() {
    const {repo, pullRequests, syncPullRequests, createDeck} = this.props;

    return (
      <div className="container">
         <div className="row">
           <div className="col-md-12">
             <h2>New deck</h2>

             <h2>Choose pull request for your slide deck</h2>
             <PullRequestList pullRequests={pullRequests}
               createDeck={createDeck} />
             <SyncButton syncPullRequests={syncPullRequests}
               repo={repo} />
           </div>
         </div>
      </div>
    );
  }
});
