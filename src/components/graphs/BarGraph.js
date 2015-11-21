import React from 'react';

const BarGraph = () => {
  return (
    <svg
      style={ styles.chart }
      width="420"
      height="150"
      aria-labelledby="title desc"
      role="img">

      <title id="title">A bar chart showing information</title>
      <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>

      <g style={ styles.bar }>
        <rect
          width="40"
          height="19">
        </rect>
        <text
          style={ styles.text }
          x="45"
          y="9.5"
          dy=".35em">
          4 apples
        </text>
      </g>
      <g style={ styles.bar }>
        <rect
          width="80"
          height="19"
          y="20">
        </rect>
        <text
          style={ styles.text }
          x="85"
          y="28"
          dy=".35em">
          8 bananas
        </text>
      </g>
    </svg>
  );
};

const styles = {
  bar: {
    fill: 'red',
    height: '21px',
    transition: 'fill .3s ease',
    cursor: 'pointer',
    fontFamily: 'Helvetica, sans-serif',
    ':hover': {
      fill: 'black',
    },
    ':focus': {
      fill: 'black',
    },
  },
  text: {
    color: 'black',
  },
}

export default BarGraph;
