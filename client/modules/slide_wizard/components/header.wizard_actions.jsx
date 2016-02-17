import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="nav navbar-nav wizard-actions">
        <li className="nav-item wizard-action">
          <a href="#" className="nav-link" onClick={this.addSlide}>
            <i className="fa fa-plus"></i>
          </a>
        </li>
      </div>
    );
  },

  addSlide(e) {
    e.preventDefault();
    const {actions, slideDeck} = this.props;

    actions.addSlide(slideDeck._id);
  }
});
