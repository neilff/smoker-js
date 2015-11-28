import React from 'react';

const Button = ({ onClick, children, className = {} }) => {
  return (
    <button
      style={ styles.base }
      className={ `btn btn-primary h6 ${ className }` } onClick={ onClick }>
      { children }
    </button>
  );
};

const styles = {
  base: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
};

export default Button;
