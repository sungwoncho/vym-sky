import React from 'react';

export default React.createClass({
  render() {
    const {pullRequest} = this.props;

    return (
      <li className="pr-item">
        <a href="#" className="pr-item-link" onClick={this.handleCreateDeck}>
          {pullRequest.number} / {pullRequest.title}
        </a>
      </li>
    );
  },

  handleCreateDeck(e) {
    e.preventDefault();

    const {createDeck, pullRequest} = this.props;

    createDeck(pullRequest._id);
  }
});
