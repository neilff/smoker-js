import React from 'react';

const InputNumber = ({ style = {}, className = '', min, max, value, onChange }) => {
  return (
    <input
      style={{ ...style, ...styles.base }}
      className={ className }
      type="number"
      name="quantity"
      value={ value }
      onChange={ (e) => onChange(parseFloat(e.target.value)) }
      min={ min }
      max={ max } />
  );
};

const styles = {
  base: {},
};

export default InputNumber;
