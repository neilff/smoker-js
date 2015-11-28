import React from 'react';

const NavigatorItem = ({ children }) => {
  return (
    <a
      href="#"
      style={ styles.base }
      className="flex flex-center icon white">
      { children }
    </a>
  );
};

const styles = {
  base: {
    fontSize: '1.25rem',
    fontWeight: '100',
    height: '4rem',
    justifyContent: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    width: '4rem',
    transition: 'all 150ms',
  },
};

export default NavigatorItem;
