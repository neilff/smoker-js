import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleProfileDropdown, closeAllMenus } from '../reducers/ui';
import { setConversionType } from '../reducers/settings';

import ContentWrapper from '../components/common/ContentWrapper';
import Navigator from '../components/navigator/Navigator';

const mapStateToProps = (state) => {
  return {
    profileVisible: state.ui.get('profileDropdownVisible'),
    displayUnit: state.settings.get('displayUnit'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: (e) => {
      e.stopPropagation();
      dispatch(toggleProfileDropdown());
    },
    closeMenus: () => dispatch(closeAllMenus()),
    saveConversionType: (type) => dispatch(setConversionType(type)),
  };
};

const App = (props) => {
  const {
    children,
    closeMenus,
    profileVisible,
    saveConversionType,
    toggleMenu,
    displayUnit,
  } = props;

  return (
    <main onClick={ closeMenus }>
      <Navigator
        toggleMenu={ toggleMenu }
        profileVisible={ profileVisible }
        settings={{
          saveConversionType,
          displayUnit,
        }} />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </main>
  );
};

App.displayName = 'App';
App.propTypes = {
  children: PropTypes.node.isRequired,
  closeMenus: PropTypes.func.isRequired,
  profileVisible: PropTypes.bool.isRequired,
  saveConversionType: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
App.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
