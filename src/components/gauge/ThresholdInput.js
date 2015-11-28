import React from 'react';

import InputNumber from '../input/Number';

const ThresholdInput = (props) => {
  const {
    onSave,
    value,
    className = '',
    style = {},
  } = props;

  return (
    <div>
      <InputNumber
        className={ `white ${ className }` }
        style={{ ...style, ...styles.input }}
        value={ value }
        onChange={ (val) => onSave(val) } />
    </div>
  );
};

const styles = {
  input: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '100',
    display: 'inline-block',
  },
};

export default ThresholdInput;
