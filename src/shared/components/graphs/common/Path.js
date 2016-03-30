import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List, is } from 'immutable';
import d3 from 'd3';

class Path extends Component {
  static propTypes = {
    reading: PropTypes.instanceOf(List).isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    y: PropTypes.func.isRequired,
    defaultTickTime: PropTypes.number.isRequired,
  }

  defaultProps = {
    style: {},
  }

  componentDidMount() {
    const elem = findDOMNode(this);
    const { reading } = this.props;
    const { line } = this;

    d3.select(elem)
      .datum(reading.toJS())
      .attr('d', line.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const elem = findDOMNode(this);
    const { reading, defaultTickTime } = this.props;
    const { line } = this;

    // Update the line if the values change
    if (!is(nextProps.reading, reading)) {
      d3.select(elem)
        .datum(reading.toJS())
        .transition()
          .ease('linear')
          .duration(defaultTickTime)
          .attr('d', line.bind(this));
    }
  }

  getX() {
    return d3.scale.linear()
             .domain([0, this.props.reading.size - 1])
             .range([0, this.props.width]);
  }

  render() {
    const { style } = this.props;

    return (
      <path style={{ ...style, ...styles.base }}></path>
    );
  }

  line = d3.svg.line()
           .x((d, i) => this.getX()(i))
           .y((d) => this.props.y(d))
}

const styles = {
  base: {
    fill: 'none',
    strokeWidth: '1px',
  },
};

export default Path;
