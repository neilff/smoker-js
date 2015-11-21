import React from 'react';

const total = 158;

const numberFixer = (num) => ((num * total) / 100);

const PieGraph = ({ percent }) => {
  const calculation = numberFixer(percent);

  return (
    <svg
      width="100"
      height="100"
      style={ styles.chart }>
      <circle
        r="25"
        cx="50"
        cy="50"
        style={{
          'strokeDasharray': `${ calculation }px, 158px`,
          ...styles.pie
        }}/>
      <circle
        r="35"
        cx="50"
        cy="50"
        style={ styles.middle } />
    </svg>
  );
};

const $primaryColor = '#0074d9';

const styles = {
  chart: {
    transform: 'rotate(-90deg)',
    background: '#ddd',
    borderRadius: '50%',
    display: 'block',
  },
  pie: {
    fill: 'none',
    stroke: $primaryColor,
    strokeWidth: '50',
    transition: 'stroke-dasharray .3s ease',
  },
  middle: {
    fill: '#212121',
  },
};

export default PieGraph;
