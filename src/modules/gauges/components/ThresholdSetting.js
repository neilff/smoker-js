import React, { PropTypes } from 'react';

import Circle from 'components/ui/Circle';
import ThresholdInput from './ThresholdInput';

const ThresholdSetting = (props) => {
  const {
    atThreshold,
    children,
    className,
    color,
    onSave,
    value,
  } = props;

  return (
    <div
      style={ styles.base }
      className={ `absolute center ${ className }` }>

      <Circle
        width="0.5rem"
        color={ color }
        filled={ atThreshold }/>

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

ThresholdSetting.displayName = 'ThresholdSetting';
ThresholdSetting.propTypes = {
  onSave: PropTypes.func,
  value: PropTypes.string,
  atThreshold: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  width: PropTypes.string,
};
ThresholdSetting.defaultProps = {
  atThreshold: false,
  className: '',
  color: '',
};

const styles = {
  base: {
    width: '100px',
    bottom: '-52.5',
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
