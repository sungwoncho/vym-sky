import React from 'react';
import _ from 'lodash';

import RepoList from './repos.list.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

export default React.createClass({
  render() {
    let {repos} = this.props;

    return (
      <div className="container">
        <RepoList repos={repos} />
        <a href={pathFor('settings', {section: 'repos'})}>
          Manage repos
        </a>
      </div>
    );
  }
});
