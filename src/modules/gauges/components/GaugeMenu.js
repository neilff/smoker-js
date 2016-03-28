import React, { PropTypes } from 'react';

import Dropdown from 'components/ui/Dropdown';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import ContentEditable from 'components/ui/ContentEditable';

const GaugeMenu = ({ isVisible, toggleMenu, color, onColorChange }) => {
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
        <h5>Configure Gauge</h5>
        <ul className="list-reset mt2">
          <li style={ styles.listItem } className="ml1 mr1 mt1">
            Start Timer
          </li>
          <li style={ styles.listItem } className="ml1 mr1 mt1">
            Disable Gauge
          </li>
        </ul>

        <h5>Color</h5>
        <ul className="list-reset mt2">
          <ContentEditable
            onChange={ onColorChange }
            html={ color } />
        </ul>
      </Dropdown>
    </div>
  );
};

GaugeMenu.displayName = 'GaugeMenu';
GaugeMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
};
GaugeMenu.defaultProps = {};

const styles = {
  dropdown: {
    top: '2rem',
    right: '0',
    width: '240px',
    fontSize: '0.85rem',
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
    paddingLeft: '0.5rem',
  },
};

export default GaugeMenu;
