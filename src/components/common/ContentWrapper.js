import React from 'react';
import Radium from 'radium';

const ContentWrapper = ({ children }) => {
  return (
    <div style={ styles.base }>
      { children }
    </div>
  );
};

const styles = {
  base: {
    marginTop: '4rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

export default Radium(ContentWrapper);
