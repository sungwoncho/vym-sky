import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import {pathFor} from '/client/modules/core/libs/helpers';

const SettingsMenu = ({currentSection}) => {
  const sections = [ 'account', 'billing' ];

  return (
    <div className="list-group">
      {
        sections.map(function (section) {
          let isActive = section === currentSection;
          let itemClass = classNames({
            'list-group-item': true,
            active: isActive
          });
          return (
            <a key={section}
              href={pathFor('settings', {section})}
              className={itemClass}>
              {_.capitalize(section)}
            </a>
          );
        })
      }
    </div>
  );
};

export default SettingsMenu;
