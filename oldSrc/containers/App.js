import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleProfileDropdown, closeAllMenus } from '../reducers/ui';
import { setConversionType } from '../reducers/settings';

import ContentWrapper from '../components/common/ContentWrapper';
import Navigator from '../components/navigator/Navigator';

const mapStateToProps = (state) => {
  return {
    displayUnit: state.settings.get('displayUnit'),
    isRecording: state.record.get('isRecording'),
    profileVisible: state.ui.get('profileDropdownVisible'),
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
    displayUnit,
    isRecording,
    profileVisible,
    saveConversionType,
    toggleMenu,
  } = props;

  return (
    <main onClick={ closeMenus }>
      <Navigator
        toggleMenu={ toggleMenu }
        profileVisible={ profileVisible }
        settings={{
          saveConversionType,
          displayUnit,
        }}
        isRecording={ isRecording } />
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
  isRecording: PropTypes.bool.isRequired,
  profileVisible: PropTypes.bool.isRequired,
  saveConversionType: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
App.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
