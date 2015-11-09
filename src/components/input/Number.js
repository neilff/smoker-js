import React from 'react';

const InputNumber = ({ min, max, value, onChange }) => {
  return (
    <input
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
