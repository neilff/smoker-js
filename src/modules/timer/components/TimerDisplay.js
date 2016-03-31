import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { convertMsToTime } from 'shared/utils/conversion';

function mapStateToProps(state, ownProps) {
  return {
    time: state.timer.getIn([ownProps.index, 'time']),
  };
}

function mapDispatchToProps() {
  return {};
}

const TimerDisplay = ({ time }) => {
  return (
    <div
      style={ styles.timer }
      className="absolute">
      <div style={ styles.text }>
        { convertMsToTime(time) }
      </div>
    </div>
  );
};

TimerDisplay.displayName = 'TimerDisplay';
TimerDisplay.propTypes = {
  /**
   * The current timer value expressed in MS
   */
  time: PropTypes.number,
};
TimerDisplay.defaultProps = {};

const styles = {
  text: {
    textTransform: 'uppercase',
    fontWeight: 100,
    fontSize: 14,
  },
  timer: {
    width: '100%',
    bottom: -35,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerDisplay);
