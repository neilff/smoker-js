import React from 'react';

const Chart = ({ children, width, height }) => {
  return (
    <svg width={ width } height={ height }>
      <g transform={ `translate(${ width / 2 }, ${ width / 2 })` }>
        { children }
      </g>
    </svg>
  );
};

export default Chart;
