import React from 'react';

const AccountSettings = ({currentUser}) => (
  <div>
    <h2>Account</h2>
    GitHub: {currentUser.services.github.username}
    <div>
      <a href="https://github.com/settings/applications" target="_blank">
        Go to application settings
      </a>
    </div>

    <div>
      Permissions: {currentUser.scopes}
    </div>
  </div>
);

export default AccountSettings;
