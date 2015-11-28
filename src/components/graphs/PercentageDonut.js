import React from 'react';

import { Chart, AnimatedFixedPath } from './common';
import { convertValue, calculateDonutArc } from '../../utils/conversion';

const defaultColors = [
  '#0074d9',
  '#eee',
];

const PercentageDonut = (props) => {
  const {
    width = 100,
    value = 0,
    radius = 25,
    primaryColor = defaultColors[0],
    secondaryColor = defaultColors[1],
  } = props;

  const calculateArc = calculateDonutArc(width, radius);

  return (
    <Chart width={ width } height={ width }>
      <g className="arc">
        <path
          fill={ secondaryColor }
          d={
            calculateArc({
              endAngle: convertValue(100),
            })
          }></path>
      </g>
      <g className="arc">
        <AnimatedFixedPath
          arc={ calculateArc }
          fill={ primaryColor }
          endAngle={ convertValue(value) } />
      </g>
    </Chart>
  );
};

export default PercentageDonut;
