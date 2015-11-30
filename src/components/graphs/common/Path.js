import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import d3 from 'd3';

class Path extends Component {
  static propTypes = {
    reading: PropTypes.number.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    y: PropTypes.func.isRequired,
  }

  defaultProps = {
    style: {},
  }

  componentDidMount() {
    const {
      y,
      width,
    } = this.props;

    let data = List();

    const elem = findDOMNode(this);

    const getX = () => {
      return d3.scale.linear()
        .domain([0, data.size - 1])
        .range([0, width]);
    };

    const line = d3.svg.line()
      .x((d, i) => getX()(i))
      .y((d) => y(d));

    d3.select(elem)
      .datum(data.toJS())
      .attr('d', line);

    const tick = () => {
      const { reading } = this.props;

      data = data.push(reading);

      d3.select(elem)
        .datum(data.toJS())
        .transition()
          .ease('linear')
          .duration(1000)
          .attr('d', line)
          .each('end', tick);
    };

    tick();
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

export default Path;
