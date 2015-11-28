import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import TransitionPath from './common/TransitionPath';

const LineGraph = ({ readings, resolution, height, width, min, max }) => {
  return (
    <div>
      <svg width={ width } height={ height }>
        <defs>
          <clipPath id="clip">
            <rect
              width={ width - 50 }
              height={ height }></rect>
          </clipPath>
        </defs>
        <g transform="translate(40, 20)">
          <g clipPath="url(#clip)">
            {
              readings.map((i, idx) => {
                return (
                  <TransitionPath
                    height={ height }
                    key={ idx }
                    max={ max }
                    min={ min }
                    reading={ i }
                    resolution={ resolution }
                    width={ width } />
                );
              })
            }
          </g>
        </g>
      </svg>
    </div>
  );
};

LineGraph.displayName = 'LineGraph';
LineGraph.propTypes = {
  height: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  readings: PropTypes.instanceOf(Map).isRequired,
  resolution: PropTypes.number,
  width: PropTypes.number,
};
LineGraph.defaultProps = {
  height: 480,
  max: 350,
  min: 0,
  resolution: 300,
  width: 960,
};

export default LineGraph;
