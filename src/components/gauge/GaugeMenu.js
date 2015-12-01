import React, { PropTypes } from 'react';

import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import Icon from '../common/Icon';

const GaugeMenu = ({ isVisible, toggleMenu }) => {
  const menuOptions = [
    {
      title: 'Start Timer',
    },
    {
      title: 'Select Graph Color',
    },
    {
      title: 'Disable Gauge',
    },
  ];

  return (
    <div className="absolute top-0 right-0">
      <Button
        className="absolute btn p0 top-0"
        style={ styles.button }
        onClick={ (e) => {
          e.stopPropagation();
          toggleMenu();
        }}>
        <Icon
          style={ styles.icon }
          type="ion-android-more-vertical" />
      </Button>
      <Dropdown isVisible={ isVisible } style={ styles.dropdown }>
        Configure Gauge
        <ul className="list-reset">
          {
            menuOptions.map((i, idx) => {
              return (
                <li
                  key={ idx }
                  style={ styles.listItem }
                  className="ml1 mr1 mt1">
                  { i.title }
                </li>
              );
            })
          }
        </ul>
      </Dropdown>
    </div>
  );
};

GaugeMenu.displayName = 'GaugeMenu';
GaugeMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
GaugeMenu.defaultProps = {};

const styles = {
  dropdown: {
    top: '2rem',
    right: '0',
    width: '240px',
  },
  icon: {
    width: '2rem',
    fontSize: '1.5rem',
  },
  button: {
    color: '#424242',
    right: '-1rem',
  },
  listItem: {
    paddingLeft: '1rem',
  },
};

export default GaugeMenu;
