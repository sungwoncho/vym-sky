import React from 'react';

export default React.createClass({
  render() {
    const {repo} = this.props;

    return (
      <li>
        {repo.name}
      </li>
    );
  },

});
