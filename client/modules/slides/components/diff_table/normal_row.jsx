import React from 'react';

export default React.createClass({
  render() {
    const {change} = this.props;

    return (
      <tr className="dt-normal">
        <td className="dt-line-num">{change.ln1}</td>
        <td className="dt-line-num">{change.ln2}</td>
        <td className="dt-code">{change.content}</td>
      </tr>
    );
  }
});
