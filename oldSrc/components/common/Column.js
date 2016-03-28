import React from 'react';

const Column = ({ children, className = '' }) => {
  return (
    <div className={ `m1 p1 ${ className }` }>{ children }</div>
  );
};

export default Column;
