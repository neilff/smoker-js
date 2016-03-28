import React, { PropTypes } from 'react';

const Circle = ({ width, color, className, children, filled }) => {
  return (
    <div
      className={ className }
      style={{
        ...styles.base,
        width: width,
        height: width,
        borderColor: color,
        background: filled ? color : 'none',
      }}>
      { children }
    </div>
  );
};

Circle.displayName = 'Circle';
Circle.propTypes = {
  /**
   * Children to render inside the circle
   */
  children: PropTypes.node,
  /**
   * Classes to apply to the circle
   */
  className: PropTypes.string,
  /**
   * The color of the circle
   */
  color: PropTypes.string,
  /**
   * Whether to circle should be filled or not
   */
  filled: PropTypes.bool,
  /**
   * Width of the circle
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
Circle.defaultProps = {
  className: '',
  color: '#0074d9',
  filled: false,
  width: '3vw',
};

const styles = {
  base: {
    border: '1px solid #0074d9',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 auto',
  },
};

export default Circle;
