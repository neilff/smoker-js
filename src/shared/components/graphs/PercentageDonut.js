import React, { PropTypes } from 'react';

import Chart from 'components/graphs/common/Chart';
import AnimatedFixedPath from 'components/graphs/common/AnimatedFixedPath';

import { convertValue, calculateDonutArc } from 'utils/conversion';

const defaultColors = [
  '#0074d9',
  '#eee',
];

const PercentageDonut = (props) => {
  const {
    width,
    value,
    radius,
    primaryColor,
    secondaryColor,
  } = props;

  const calculateArc = calculateDonutArc(width, radius);
  const calculateArcInside = calculateDonutArc(width, radius + 2);

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
          arc={ calculateArcInside }
          fill={ '#111' }
          endAngle={ convertValue(value) } />

        <AnimatedFixedPath
          arc={ calculateArc }
          fill={ primaryColor }
          endAngle={ convertValue(value) } />
      </g>
    </Chart>
  );
};

PercentageDonut.displayName = 'PercentageDonut';
PercentageDonut.propTypes = {
  /**
   * The width of the graph, expressed as a percentage (0 - 100)
   */
  width: PropTypes.number,
  /**
   * The current value assigned to the graph
   */
  value: PropTypes.number,
  /**
   * The radius of the circle
   */
  radius: PropTypes.number,
  /**
   * The primary color to be used on the graph
   */
  primaryColor: PropTypes.string,
  /**
   * The secondary color to be used on the graph
   */
  secondaryColor: PropTypes.string,
};
PercentageDonut.defaultProps = {
  width: 100,
  value: 0,
  radius: 25,
  primaryColor: defaultColors[0],
  secondaryColor: defaultColors[1],
};

export default PercentageDonut;
