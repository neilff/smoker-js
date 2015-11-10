import React from 'react';

const Circle = ({ width = '3vw', color = '#0074d9', className = '', children }) => {
  return (
    <div
      className={ className }
      style={{ ...styles.base, width: width, height: width, borderColor: color }}>
      { children }
    </div>
  );
}

const styles = {
  base: {
    border: '1px solid #0074d9',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 auto',
  },
};

export default Circle;
