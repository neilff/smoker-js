import React, { PropTypes } from 'react';
import { List } from 'immutable';

import TransitionPath from './common/TransitionPath';

const LineGraph = ({ data, height, width }) => {
  return (
    <div>
      <svg width={ width } height={ height }>
        <defs>
          <clipPath id="clip">
            <rect width={ width - 60 } height={ height }></rect>
          </clipPath>
        </defs>
        <g transform="translate(40, 20)">
          <g clipPath="url(#clip)">
            <TransitionPath
              width={ width }
              height={ height }
              data={ data } />
          </g>
        </g>
      </svg>
    </div>
  );
};

LineGraph.displayName = 'LineGraph';
LineGraph.propTypes = {
  data: PropTypes.instanceOf(List),
  height: PropTypes.number,
  width: PropTypes.number,
};
LineGraph.defaultProps = {
  data: List(),
  height: 480,
  width: 960,
};

export default LineGraph;
