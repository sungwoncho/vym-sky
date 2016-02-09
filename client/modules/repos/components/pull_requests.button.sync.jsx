import React from 'react';

export default React.createClass({
  render() {
    return (
      <a href="#sync"
        onClick={this.handleLoad}
        className="btn btn-secondary">
        Sync
      </a>
    );
  },

  handleLoad(e) {
    e.preventDefault();

    this.props.syncPullRequests(this.props.repo._id);
  }
});
