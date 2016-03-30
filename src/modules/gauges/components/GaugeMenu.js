import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  toggleMenuVisibility,
  setColor,
  setGaugeStatus,
} from 'modules/gauges/actions';

import {
  resetTimerState,
  startTimer,
  stopTimer,
} from 'modules/timer/actions';

function mapStateToProps(state, ownProps) {
  const idx = ownProps.idx;

  return {
    color: state.gauges.getIn([idx, 'color']),
    isDisabled: state.gauges.getIn([idx, 'disabled']),
    isTimerEnabled: state.timer.getIn([idx, 'timerEnabled']),
    isVisible: state.gauges.getIn([idx, 'menuVisible']),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const idx = ownProps.idx;

  return {
    changeColor: (val) => dispatch(setColor(idx, val)),
    timerReset: () => dispatch(resetTimerState(idx)),
    timerStart: () => dispatch(startTimer(idx)),
    timerStop: () => dispatch(stopTimer(idx)),
    toggleGauge: () => dispatch(setGaugeStatus(idx)),
    toggleMenu: () => dispatch(toggleMenuVisibility(idx)),
  };
}

import Dropdown from 'components/ui/Dropdown';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import ContentEditable from 'components/ui/ContentEditable';

const GaugeMenu = (props) => {
  const {
    changeColor,
    color,
    isDisabled,
    isTimerEnabled,
    isVisible,
    timerReset,
    timerStart,
    timerStop,
    toggleGauge,
    toggleMenu,
  } = props;

  return (
    <div className="absolute top-0 right-0">
      <Button
        className="absolute btn p0 top-0"
        style={ styles.button }
        onClick={(e) => {
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
          {(() => {
            if (isTimerEnabled) {
              return (
                <li
                  style={{
                    ...styles.listItem,
                    ...styles.pointer,
                  }}
                  className="ml1 mr1 mt1"
                  onClick={ timerReset }>
                  Stop Timer
                </li>
              );
            }

            return (
              <li
                style={{
                  ...styles.listItem,
                  ...styles.pointer,
                }}
                className="ml1 mr1 mt1"
                onClick={ timerStart }>
                Start Timer
              </li>
            );
          })()}

          <li
            style={{
              ...styles.listItem,
              ...styles.pointer,
            }}
            className="ml1 mr1 mt1"
            onClick={ timerStop }>
            Reset Timer
          </li>

          <li
            style={{
              ...styles.listItem,
              ...styles.pointer,
            }}
            onClick={ toggleGauge }
            className="ml1 mr1 mt1">
            { isDisabled ? 'Enable' : 'Disable' } Gauge
          </li>
        </ul>

        <h5>Color</h5>
        <ul className="list-reset mt2">
          <li style={ styles.listItem } className="ml1 mr1 mt1">
            <ContentEditable
              onChange={ changeColor }
              html={ color } />
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

GaugeMenu.displayName = 'GaugeMenu';
GaugeMenu.propTypes = {
  /**
   * The currently assigned color
   */
  color: PropTypes.string.isRequired,
  /**
   * Whether the gauge menu is visible
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * Whether the timer is enabled or not
   */
  isTimerEnabled: PropTypes.bool.isRequired,
  /**
   * Fired when the menu btn is clicked
   */
  toggleMenu: PropTypes.func.isRequired,
  /**
   * Fired when the color is modified
   */
  changeColor: PropTypes.func.isRequired,
  /**
   * Fired when the enable / disable gauge button is clicked
   */
  toggleGauge: PropTypes.func.isRequired,
  /**
   * Whether the gauge is enabled or not
   */
  isDisabled: PropTypes.bool.isRequired,
  /**
   * Starts the timer
   */
  timerStart: PropTypes.func.isRequired,
  /**
   * Stops the timer
   */
  timerStop: PropTypes.func.isRequired,
  /**
   * Resets the timer
   */
  timerReset: PropTypes.func.isRequired,
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
  pointer: {
    cursor: 'pointer',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeMenu);
