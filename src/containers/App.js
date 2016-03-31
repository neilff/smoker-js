import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as settingsActions from 'modules/settings/actions';

function mapStateToProps(state) {
  return {
    displayUnit: state.settings.get('displayUnit'),
    isRecording: state.record.get('isRecording'),
    isOnline: state.socket.get('connected'),
    profileVisible: state.settings.getIn(['dropdowns', 'profileVisible']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(settingsActions, dispatch);
}

import ContentWrapper from 'shared/components/ui/ContentWrapper';
import Navigator from 'shared/components/navigator/Navigator';

export class App extends Component {
  render() {
    const {
      children,
      closeAllMenus,
      displayUnit,
      isOnline,
      isRecording,
      profileVisible,
      setConversionType,
      toggleProfileDropdown,
    } = this.props;

    return (
      <main onClick={ closeAllMenus }>
        <Navigator
          toggleMenu={(e) => {
            e.stopPropagation();
            toggleProfileDropdown();
          }}
          profileVisible={ profileVisible }
          settings={{
            setConversionType,
            displayUnit,
          }}
          isRecording={ isRecording }
          isOnline={ isOnline } />
        <ContentWrapper>
          { children }
        </ContentWrapper>
      </main>
    );
  }
}

App.displayName = 'App';
App.propTypes = {
  /**
   * Children to render inside the app container
   */
  children: PropTypes.node.isRequired,
  /**
   * Function to fire to close all menus
   */
  closeAllMenus: PropTypes.func.isRequired,
  /**
   * Whether the recording suite is running
   */
  isRecording: PropTypes.bool.isRequired,
  /**
   * Whether the application is online or not
   */
  isOnline: PropTypes.bool.isRequired,
  /**
   * Whether the profile dropdown is visible
   */
  profileVisible: PropTypes.bool.isRequired,
  /**
   * Fired when a conversion type is selected
   */
  setConversionType: PropTypes.func.isRequired,
  /**
   * Toggles the navigator menu
   */
  toggleProfileDropdown: PropTypes.func.isRequired,
  /**
   * The display unit that is currently being used
   */
  displayUnit: PropTypes.string.isRequired,
};
App.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
