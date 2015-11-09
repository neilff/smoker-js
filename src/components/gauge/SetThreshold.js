import React, { Component } from 'react';

import InputNumber from '../input/Number';

const SetThreshold = ({ onSave, value }) => {
  return (
    <div>
      <InputNumber
        value={ value }
        onChange={ (val) => onSave(val) } />
    </div>
  );
}

export default SetThreshold;
