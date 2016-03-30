import React, { PropTypes } from 'react';

const TemperatureReading = ({ measurement, reading }) => {
  return (
    <div
      className="absolute left-0 right-0 center"
      style={ styles.measurement }>
      { <div>{ reading }<sup style={ styles.sup }>&deg;{ measurement }</sup></div> }
    </div>
  );
};

TemperatureReading.displayName = 'TemperatureReading';
TemperatureReading.propTypes = {
  measurement: PropTypes.oneOf(['F', 'C']),
  reading: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  children: PropTypes.node,
};
TemperatureReading.defaultProps = {
  reading: false,
};

const styles = {
  base: {
    margin: '1rem auto 2rem',
  },
  measurement: {
    fontSize: '4rem',
    fontWeight: '100',
    top: '5rem',
  },
  sup: {
    fontSize: '2rem',
  },
  title: {
    width: '100%',
  },
};

export default TemperatureReading;
