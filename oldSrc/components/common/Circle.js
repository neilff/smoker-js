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
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  width: PropTypes.string,
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
