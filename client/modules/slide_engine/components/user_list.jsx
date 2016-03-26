import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

import {getAvatarUrl} from '/client/modules/core/libs/helpers.js';

const UserList = ({users}) => (
  <ul className="list-unstyled user-list pull-xs-right">
    {
      users.map(user => {
        return <UserItem user={user}
          key={user._id} />;
      })
    }
  </ul>
);

const UserItem = ({user}) => {
  let avatarUrl = getAvatarUrl({githubHandle: user.githubHandle, size: 50});
  let tooltip = <Tooltip id={user._id}>{user.displayName}</Tooltip>;

  return (
    <li>
      <OverlayTrigger placement="top" overlay={tooltip}>
        <img className="user-list-avatar"
          src={avatarUrl} />
      </OverlayTrigger>
    </li>
  );
};

export default UserList;
