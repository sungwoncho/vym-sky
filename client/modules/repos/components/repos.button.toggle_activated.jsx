import React from 'react';

export default React.createClass({
  render() {
    return (
      <a href="#"
        onClick={this.handleToggleActivated}
        className="pull-right btn btn-secondary">
        {this.getLabel()}
      </a>
    );
  },

  getLabel() {
    const {repo} = this.props;

    if (repo.activated) {
      return 'Remove';
    } else {
      return 'Activate';
    }
  },

  handleToggleActivated(e) {
    e.preventDefault();

    const {repo, toggleActivated} = this.props;
    toggleActivated(repo._id);
  }
});
