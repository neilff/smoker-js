import React, { PropTypes } from 'react';

import InputNumber from 'shared/components/input/Number';

const ThresholdInput = ({ onSave, value, className, style }) => {
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

ThresholdInput.displayName = 'ThresholdInput';
ThresholdInput.propTypes = {
  /**
   * The function to fire on change
   */
  onSave: PropTypes.func,
  /**
   * The current value of the input
   */
  value: PropTypes.string,
  /**
   * CSS classes to pass to the component
   */
  className: PropTypes.string,
  /**
   * CSS styles to pass to the component
   */
  style: PropTypes.object,
};
ThresholdInput.defaultProps = {
  className: '',
  style: {},
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
