import React from 'react';

const TemperatureWarning = ({ children, className = '', showWarning }) => {
  const warningStyle = showWarning ?
    styles.isVisible :
    styles.isHidden;

  return (
    <div
      style={{ ...styles.base, ...warningStyle }}
      className={ `p1 center ${ className }` }>
      { children }
    </div>
  );
}

const styles = {
  base: {
    transition: 'all 250ms',
    margin: '0 0 0.5rem',
  },
  isVisible: {
    visibility: 'visible',
    opacity: 1,
  },
  isHidden: {
    visibility: 'hidden',
    opacity: 0,
  },
}

export default TemperatureWarning;
