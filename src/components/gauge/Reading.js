import React from 'react';

const TemperatureReading = ({ measurement, reading, children }) => {
  return (
    <div
      className="absolute left-0 right-0 center"
      style={ styles.measurement }>
      <div>{ reading }<sup style={ styles.sup }>&deg;{ measurement }</sup></div>
      <div className="h4">{ children }</div>
    </div>
  );
};

const styles = {
  base: {
    margin: '1rem auto 2rem',
  },
  measurement: {
    fontSize: '5vw',
    fontWeight: '100',
    top: '6.25vw',
  },
  sup: {
    fontSize: '3vw',
  },
};

export default TemperatureReading;
