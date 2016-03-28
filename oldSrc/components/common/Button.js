import React, { PropTypes } from 'react';
import Radium from 'radium';

const Button = ({ onClick, children, style, className = '' }) => {
  return (
    <button
      style={{
        ...styles.base,
        ...style,
      }}
      className={ `btn ${ className }` } onClick={ onClick }>
      { children }
    </button>
  );
};

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const styles = {
  base: {
    fontWeight: '100',
    textTransform: 'uppercase',
    ':active': {
      outline: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
};

export default Radium(Button);
