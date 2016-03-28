import React from 'react';

const TemperatureWarning = ({ children, className = '', style = {}, isVisible }) => {
  const warningStyle = isVisible ?
    styles.isVisible :
    styles.isHidden;

  return (
    <div
      style={{ ...styles.base, ...warningStyle, ...style }}
      className={ `h6 p1 center ${ className }` }>
      { children }
    </div>
  );
};

const styles = {
  base: {
    transition: 'all 250ms',
    margin: '0 0 0.5rem',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  isVisible: {
    visibility: 'visible',
    opacity: 1,
  },
  isHidden: {
    visibility: 'hidden',
    opacity: 0,
  },
};

export default TemperatureWarning;
