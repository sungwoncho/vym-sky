import React from 'react';

import MainLayout from './layout_main.jsx';

const SettingLayout = ({content = () => null}) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          menu
        </div>
        <div className="col-sm-9">
          {content()}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
