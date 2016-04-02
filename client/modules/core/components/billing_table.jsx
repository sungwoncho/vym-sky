import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';


const BillingTable = ({repos}) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Repo</th>
        <th>Plan</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      {
        repos.map(repo => (
          <RepoRow repo={repo}
            key={repo._id} />
        ))
      }
    </tbody>
  </table>
);

const RepoRow = ({repo}) => (
  <tr>
    <td>
      <a href={pathFor('repo', {repoName: repo.name, ownerName: repo.ownerName})}>
        {repo.name}
      </a>
    </td>
    <td>
      {repo.plan}
    </td>
    <td>
      {repo.plan === 'pro' ? '$12' : 'free'}
    </td>
  </tr>
);

export default BillingTable;
