import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map } from 'immutable';

import TransitionPath from './common/TransitionPath';

class LineGraph extends Component {
  static propTypes = {
    height: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    readings: PropTypes.instanceOf(Map).isRequired,
    resolution: PropTypes.number,
    width: PropTypes.number,
  }

  static defaultProps = {
    height: 480,
    max: 350,
    min: 0,
    resolution: 300,
    width: 960,
  }

  componentDidMount() {
    const elem = findDOMNode(this);

    const yAxisLeft = d3.svg.axis()
      .scale(this.y)
      .ticks(4)
      .orient('left');

    d3.select(elem)
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(50, 20)`)
      .call(yAxisLeft);
  }

  render() {
    const {
      width,
      height,
      readings,
      resolution,
    } = this.props;

    return (
      <svg className="mt2 mb2" id="graph" width={ width } height={ height }>
        <defs>
          <clipPath id="clip">
            <rect
              width={ width - 50 }
              height={ height }></rect>
          </clipPath>
        </defs>
        <g transform="translate(60, 20)">
          <g clipPath="url(#clip)">
            {
              readings.map((i, idx) => {
                return (
                  <TransitionPath
                    key={ idx }
                    resolution={ resolution }
                    x={ this.x.bind(this) }
                    y={ this.y.bind(this) }
                    reading={ i } />
                );
              })
            }
          </g>
        </g>
      </svg>
    );
  }

  x = d3.scale.linear()
        .domain([0, this.props.resolution - 1])
        .range([0, this.props.width - 40])

  y = d3.scale.linear()
        .domain([this.props.min, this.props.max])
        .range([this.props.height - 40, 0])
}

export default LineGraph;
