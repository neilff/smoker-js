import React from 'react';

const TemperatureReading = ({ measurement, reading, children }) => {
  return (
    <div
      className="relative flex flex-center"
      style={ styles.base }>
      <div
        className="absolute left-0 right-0 center"
        style={ styles.measurement }>
        <div>{ reading }<sup style={ styles.sup }>&deg;{ measurement }</sup></div>
        <div className="h4">{ children }</div>
      </div>
    </div>
  );
}

const styles = {
  base: {
    height: '20vw',
    width: '20vw',
    margin: '1rem auto 2rem',
    borderRadius: '50%',
    border: '2px solid #0074d9',
  },
  measurement: {
    fontSize: '5vw',
    fontWeight: '100',
    top: '5vw',
  },
  sup: {
    fontSize: '3vw',
  },
}

export default TemperatureReading;
