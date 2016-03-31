import React, { PropTypes, Component } from 'react';
import { Map, List, is } from 'immutable';
import { connect } from 'react-redux';
import { convertFahrenheitToC } from 'shared/utils/conversion';

function mapStateToProps(state) {
  return {
    defaultTickTime: state.settings.get('defaultTickTime'),
    colors: state.gauges.map(i => i.get('color')),
    readings: state.record.get('history'),
    timestamps: state.record.get('timestamps'),
  };
}

function mapDispatchToProps() {
  return {};
}

import Path from 'shared/components/graphs/common/Path';

class HeatGraph extends Component {
  componentDidMount() {
    const { xAxisElem, yAxisRightElem, yAxisLeftElem } = this.refs;

    // Draw the empty xAxis line
    const xAxis = d3.svg.axis()
      .scale(this.getX())
      .orient('bottom')
      .ticks(5);

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

    d3.select(yAxisLeftElem)
      .call(yAxisLeft);

    d3.select(yAxisRightElem)
      .call(yAxisRight);

    d3.select(xAxisElem)
      .call(xAxis);
  }

  componentWillReceiveProps(nextProps) {
    const { xAxisElem } = this.refs;
    const { timestamps } = this.props;

    // // Update the xAxis as time updates
    if (!is(nextProps.timestamps, timestamps)) {
      const xAxis = d3.svg.axis()
        .scale(this.getX())
        .orient('bottom')
        .ticks(5)
        .tickFormat(d3.time.format('%H:%M'));

      console.log(this.getX()(0), this.props.timestamps.first());

      d3.select(xAxisElem)
        .call(xAxis);
    }
  }

  getX() {
    return d3.time.scale()
             .domain([this.props.timestamps.first(), this.props.timestamps.last()])
             .range([0, this.props.width - 120]);
  }

  render() {
    const {
      colors,
      defaultTickTime,
      height,
      readings,
      width,
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
        <g
          className="y axis"
          ref="yAxisLeftElem"
          transform={ `translate(50, 10)` }>
        </g>
        <g
          className="y axis"
          ref="yAxisRightElem"
          transform={ `translate(${ width - 50 }, 10)` }>
        </g>
        <g transform="translate(60, 10)">
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
                    reading={ i }
                    defaultTickTime={ defaultTickTime } />
                );
              }).toList()
            }
          </g>
        </g>
        <g
          className="x axis"
          ref="xAxisElem"
          transform={ `translate(60, ${ height - 20 })` }>
        </g>
      </svg>
    );
  }

  y = d3.scale.linear()
        .domain([this.props.min, this.props.max])
        .range([this.props.height - 40, 0])
}

HeatGraph.displayName = 'HeatGraph';
HeatGraph.propTypes = {
  /**
   * The colors array to be used for the lines
   */
  colors: PropTypes.instanceOf(Map),
  /**
   * The distance between ticks
   */
  defaultTickTime: PropTypes.number,
  /**
   * The height of the graph
   */
  height: PropTypes.number,
  /**
   * The maximum measurment of the y axis
   */
  max: PropTypes.number,
  /**
   * The minimum measurment of the y axis
   */
  min: PropTypes.number,
  /**
   * The readings for each graph
   */
  readings: PropTypes.instanceOf(Map),
  /**
   * The timestamps for the graph
   */
  timestamps: PropTypes.instanceOf(List),
  /**
   * The width of the graph
   */
  width: PropTypes.number,
};
HeatGraph.defaultProps = {
  height: 500,
  max: 350,
  min: 0,
  width: 960,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeatGraph);
