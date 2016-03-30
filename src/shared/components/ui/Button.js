import React, { PropTypes } from 'react';
import Radium from 'radium';

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
  /**
   * The children to render inside the button
   */
  children: PropTypes.node,
  /**
   * Classnames to apply to the button
   */
  className: PropTypes.string,
  /**
   * Styles to apply to the button
   */
  style: PropTypes.object,
  /**
   * The onClick function to perform
   */
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
