import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    readings: state.readings,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

const Display = ({ readings }) => {
  return (
    <div>
      <h1>Temperature Reading</h1>
      <ul>
        <li>Kelvin: { readings.get('tempK') }</li>
        <li>Celcius: { readings.get('tempC') }</li>
        <li>Fahrenheit: { readings.get('tempF') }</li>
      </ul>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
