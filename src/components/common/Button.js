import React, { PropTypes } from 'react';

const Button = ({ onClick, children, style, className }) => {
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
Button.defaultProps = {
  onClick: () => {},
  className: '',
  style: {},
};

const styles = {
  base: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
};

export default Button;
