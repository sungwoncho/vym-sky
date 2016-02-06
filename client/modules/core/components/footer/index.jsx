import React from 'react';
import moment from 'moment';

export default React.createClass({
  getYear() {
    return this.props.currentDate.getFullYear();
  },

  render() {
    return (
      <footer className="main-footer">
        Coddee &copy; {this.getYear()}
      </footer>
    );
  }
});
