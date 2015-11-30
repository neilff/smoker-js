import React, { PropTypes } from 'react';

import NavigatorItem from './NavigatorItem';
import Menu from './Menu';
import Logo from '../common/Logo';
import Button from '../common/Button';
import Icon from '../common/Icon';

const Navigator = ({ style, toggleMenu, profileVisible, settings }) => {
  return (
    <div
      style={{ ...styles.base, ...style }}
      className="fixed flex flex-center top-0 left-0 right-0 z4">
      <div className="flex-auto">
        <NavigatorItem className="flex-auto">
          <Logo />
        </NavigatorItem>
      </div>
      <div className="flex-end">
        <NavigatorItem className="flex flex-center relative">
          <Button className="btn silver" onClick={ toggleMenu }>
            <Icon
              style={ styles.icon }
              type="ion-navicon" />
          </Button>
          <Menu
            isVisible={ profileVisible }
            saveConversionType={ settings.saveConversionType }
            displayUnit={ settings.displayUnit } />
        </NavigatorItem>
      </div>
    </div>
  );
};

Navigator.displayName = 'Navigator';
Navigator.propTypes = {
  profileVisible: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  style: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
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
