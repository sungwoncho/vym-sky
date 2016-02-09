import React from 'react';

export default React.createClass({
  render() {
    const {repo} = this.props;

    return (
      <li className="repo-item">
        <a href="#" className="repo-item-link">
          <div>
            {repo.owner.name} / {repo.name}
          </div>
          <p className="repo-item-description">
            {repo.description}
          </p>
        </a>
      </li>
    );
  }
});
