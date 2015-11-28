import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import d3 from 'd3';

const calcX = (width, length) => {
  return d3.scale.linear()
    .domain([0, length - 1])
    .range([0, width - 40]);
};

const calcY = (height, min, max) => {
  return d3.scale.linear()
    .domain([min, max])
    .range([height - 40, 0]);
};

const line = (width, height, length, min, max) => {
  return d3.svg.line()
    .x((d, i) => calcX(width, length)(i))
    .y((d) => calcY(height, min, max)(d));
};

class TransitionPath extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(List).isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }

  defaultProps = {
    style: {},
    min: 0,
    max: 350,
  }

  componentDidMount() {
    const {
      data,
      width,
      height,
      min = 0,
      max = 350,
    } = this.props;

    const elem = findDOMNode(this);
    const length = data.size;

    d3.select(elem)
      .datum(data.toJS())
      .attr('d', line(width, height, length, min, max));
  }

  componentDidUpdate() {
    const {
      data,
      width,
      height,
      min = 0,
      max = 350,
    } = this.props;

    const elem = findDOMNode(this);
    const length = data.size;

    d3.select(elem)
      .attr('d', line(width, height, length, min, max))
      .attr('transform', null)
      .datum(data.toJS())
      .transition()
        .duration(500)
        .ease('linear')
        .attr('transform', 'translate(' + calcX(width, length)(-1) + ',0)');
  }

  render() {
    const { style } = this.props;

    return (
      <path style={{ ...style, ...styles.base }}></path>
    );
  }
}

const styles = {
  base: {
    fill: 'none',
    stroke: 'red',
    strokeWidth: '1px',
  },
};

export default TransitionPath;
