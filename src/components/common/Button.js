import React, { PropTypes } from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      style={ styles.base }
      className={ `btn ${ className }` } onClick={ onClick }>
      { children }
    </button>
  );
};

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  onClick: () => {},
  className: '',
};

const styles = {
  base: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
};

export default Button;
