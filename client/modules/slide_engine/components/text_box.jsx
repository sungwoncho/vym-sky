import React from 'react';

import marked from 'marked';

const TextBox = ({text}) => (
  <div>
    <div dangerouslySetInnerHTML={{__html: marked(text)}} />
  </div>
);

export default TextBox;
