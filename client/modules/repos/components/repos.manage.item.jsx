import React from 'react';

import ToggleActivatedButton from './repos.button.toggle_activated.jsx';

export default React.createClass({
  render() {
    const {repo} = this.props;

    return (
      <li className="repo-item row">
        <div className="col-sm-10">
          <span>
            {repo.owner.name} / {repo.name}
          </span>
          <p className="repo-item-description">
            {repo.description}
          </p>
        </div>
        <div className="col-sm-2">
          {this.renderToggleButton()}
        </div>
      </li>
    );
  },
  renderToggleButton() {
    const {repo, toggleActivated} = this.props;

    return <ToggleActivatedButton repo={repo}
      toggleActivated={toggleActivated} />;
    }
});
