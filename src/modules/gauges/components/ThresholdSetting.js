import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setThreshold } from 'modules/gauges/actions';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  const idx = ownProps.idx;

  return {
    onSave: (key, value) => dispatch(setThreshold(idx, key, value)),
  };
}

import Circle from 'shared/components/ui/Circle';
import ThresholdInput from './ThresholdInput';

const ThresholdSetting = (props) => {
  const {
    atThreshold,
    children,
    className,
    color,
    onSave,
    target,
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
        onSave={ (val) => onSave(target, val) }
        value={ value } />
    </div>
  );
};

ThresholdSetting.displayName = 'ThresholdSetting';
ThresholdSetting.propTypes = {
  atThreshold: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  onSave: PropTypes.func,
  target: PropTypes.oneOf(['high', 'low']),
  value: PropTypes.string,
  width: PropTypes.string,
  measurement: PropTypes.oneOf(['C', 'F']),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThresholdSetting);
