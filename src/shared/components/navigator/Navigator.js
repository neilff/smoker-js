import React, { PropTypes } from 'react';

import Button from 'shared/components/ui/Button';
import Icon from 'shared/components/ui/Icon';
import Logo from 'shared/components/ui/Logo';
import Menu from 'shared/components/navigator/Menu';
import NavigatorItem from 'shared/components/navigator/NavigatorItem';
import RecordingStatus from 'modules/record/components/RecordingStatus';
import ConnectionStatus from 'modules/socket/components/ConnectionStatus';

const Navigator = (props) => {
  const {
    style,
    toggleMenu,
    profileVisible,
    settings,
    isRecording,
    isOnline,
  } = props;

  return (
    <div
      style={{ ...styles.base, ...style }}
      className="fixed flex flex-center top-0 left-0 right-0 z4">
      <div className="flex-auto">
        <NavigatorItem className="relative flex-auto">
          <Logo />
          <ConnectionStatus connected={ isOnline } />
        </NavigatorItem>
      </div>
      <div className="flex flex-center flex-justify">
        <RecordingStatus isRecording={ isRecording } />
        <NavigatorItem className="flex flex-center relative">
          <Button className="btn silver" onClick={ toggleMenu }>
            <Icon
              style={ styles.icon }
              type="ion-navicon" />
          </Button>
          <Menu
            isVisible={ profileVisible }
            setConversionType={ settings.setConversionType }
            displayUnit={ settings.displayUnit } />
        </NavigatorItem>
      </div>
    </div>
  );
};

Navigator.displayName = 'Navigator';
Navigator.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  profileVisible: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  style: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  isOnline: PropTypes.bool,
};
Navigator.defaultProps = {
  style: {},
};

const styles = {
  base: {
    height: '3.75rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  icon: {
    fontSize: '1.5rem',
    width: '1rem',

  },
};

export default Navigator;
