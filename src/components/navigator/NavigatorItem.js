import React from 'react';

const NavigatorItem = ({ children }) => {
  return (
    <div style={ styles.base } className="flex flex-center icon white">
      { children }
    </div>
  );
};

const styles = {
  base: {
    fontSize: '1.25rem',
    fontWeight: '100',
    justifyContent: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'all 150ms',
  },
};

export default NavigatorItem;
