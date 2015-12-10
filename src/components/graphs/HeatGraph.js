import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Map } from 'immutable';
import { convertFahrenheitToC } from '../../utils/conversion';

import Path from './common/Path';

class HeatGraph extends Component {
  static propTypes = {
    height: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    readings: PropTypes.instanceOf(Map).isRequired,
    width: PropTypes.number,
    colors: PropTypes.instanceOf(Map).isRequired,
  }

  static defaultProps = {
    height: 480,
    max: 350,
    min: 0,
    width: 960,
  }

  componentDidMount() {
    const { width } = this.props;

    const elem = findDOMNode(this);

    const yAxisLeft = d3.svg.axis()
      .scale(this.y)
      .ticks(4)
      .tickFormat(f => `${ f }°F`)
      .orient('left');

    const yAxisRight = d3.svg.axis()
      .scale(this.y)
      .ticks(4)
      .tickFormat(f => `${ convertFahrenheitToC(f).toFixed() }°C`)
      .orient('right');

    d3.select(elem)
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(50, 20)`)
      .call(yAxisLeft);

    d3.select(elem)
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${ width - 50 }, 20)`)
      .call(yAxisRight);
  }

  render() {
    const {
      width,
      height,
      readings,
      colors,
    } = this.props;

    return (
      <svg className="mt2 mb2" id="graph" width={ width } height={ height }>
        <defs>
          <clipPath id="clip">
            <rect
              width={ width - 120 }
              height={ height }></rect>
          </clipPath>
        </defs>
        <g transform="translate(60, 20)">
          <g clipPath="url(#clip)">
            {
              readings.map((i, idx) => {
                return (
                  <Path
                    style={{
                      stroke: colors.get(idx),
                    }}
                    key={ idx }
                    width={ width - 120 }
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

  y = d3.scale.linear()
        .domain([this.props.min, this.props.max])
        .range([this.props.height - 40, 0])
}

export default HeatGraph;
