import React from 'react';

const Row = ({ children, className = '' }) => {
  return (
    <div style={ styles.base } className={ `flex flex-stretch ${ className }` }>
      { children }
    </div>
  );
};

const styles = {
  base: {
    maxWidth: '1024px',
    margin: '0 auto',
  },
};

export default Row;
