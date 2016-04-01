import React from 'react';

import SettingsMenu from './settings_menu.jsx';
import AccountSettings from '../containers/settings_account';
import BillingSettings from '../containers/settings_billing';

const Settings = ({currentSection = 'account'}) => {
  function getSectionComponent() {
    let component = SectionMap[currentSection];
    if (!component) {
      return <div>Invalid section</div>;
    }
    return component;
  }

  let SettingSection = getSectionComponent();

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <SettingsMenu currentSection={currentSection} />
        </div>
        <div className="col-sm-9">
          <SettingSection />
        </div>
      </div>
    </div>
  );
};

// Maps section names to corresponding containers
const SectionMap = {
  account: AccountSettings,
  billing: BillingSettings
};

export default Settings;
