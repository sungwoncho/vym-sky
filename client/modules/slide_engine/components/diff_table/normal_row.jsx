import React from 'react';
import hljs from 'highlight.js';

export default React.createClass({
  render() {
    const {change} = this.props;

    return (
      <tr className="dt-normal">
        <td className="dt-line-num">{change.ln1}</td>
        <td className="dt-line-num">{change.ln2}</td>
        <td className="dt-code"
            dangerouslySetInnerHTML={{__html: this.highlight(change.content)}}>
        </td>
      </tr>
    );
  },

  highlight(content) {
    if (!content) {
      return '';
    }

    return hljs.highlightAuto(content).value;
  }
});
