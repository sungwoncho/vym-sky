import React from 'react';

const Toolbar = () => (
  <div className="wz-toolbar">
    <div className="row">
      <div className="col-lg-10 col-lg-offset-1 col-xs-12">
        <ul className="wz-toolbar-action-list">
          <li className="wz-toolbar-action">
            <a href="#">
               <i className="fa fa-plus"></i>
            </a>
          </li>
          <li className="wz-toolbar-action">
            <a href="#">
              Change type
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Toolbar;
