import React from 'react';

const TemperatureReading = ({ measurement, reading, children }) => {
  return (
    <div
      className="relative flex flex-center"
      style={ styles.circle }>
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
  measurement: {
    fontSize: '5vw',
    fontWeight: '100',
    top: '5vw',
  },
  circle: {
    height: '20vw',
    width: '20vw',
    margin: '0 auto',
    borderRadius: '50%',
    border: '2px solid #0074d9',
  },
  sup: {
    fontSize: '3vw',
  },
}

export default TemperatureReading;
