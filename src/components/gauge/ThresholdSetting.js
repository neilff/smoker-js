import React from 'react';

import Circle from '../common/Circle';
import ThresholdInput from './ThresholdInput';

const ThresholdSetting = (props) => {
  const {
    children,
    className = '',
    color = '',
    value,
    onSave,
  } = props;

  return (
    <div
      style={ styles.base }
      className={ `absolute center ${ className }` }>

      <Circle
        width="0.5rem"
        color={ color } />

      <div
        style={ styles.title }
        className="h6 gray">
        { children }
      </div>

      <ThresholdInput
        style={ styles.input }
        onSave={ onSave }
        value={ value } />
    </div>
  );
};

const styles = {
  base: {
    width: '100px',
    bottom: '-45px',
  },
  title: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    textAlign: 'center',
  },
};

export default ThresholdSetting;
