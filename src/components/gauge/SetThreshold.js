import React, { Component } from 'react';

import InputNumber from '../input/Number';

const SetThreshold = ({ onSave, value, style = {}, children }) => {
  return (
    <div>
      <InputNumber
        className="white"
        style={{ ...style, ...styles.input }}
        value={ value }
        onChange={ (val) => onSave(val) } />
    </div>
  );
}

const styles = {
  input: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '100',
    display: 'inline-block',
  },
};

export default SetThreshold;
