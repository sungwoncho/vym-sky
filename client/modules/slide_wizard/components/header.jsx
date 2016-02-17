import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';
import UserActions from './header.user_actions.jsx';
import WizardActions from './header.wizard_actions.jsx';

export default React.createClass({
  render() {
    const {currentUser, wizardActions, slideDeck} = this.props;

    return (
      <nav className="navbar navbar-full navbar-wizard">
        <a className="navbar-brand" href={pathFor('home')}>
          <img src="/images/logo-black.png" alt="logo" className="logo" />
        </a>

        <WizardActions actions={wizardActions} slideDeck={slideDeck} />
        <UserActions user={currentUser} />
      </nav>
    );
  }
});
