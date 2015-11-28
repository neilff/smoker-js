import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import d3 from 'd3';
import { range } from 'ramda';

class TransitionPath extends Component {
  static propTypes = {
    reading: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    resolution: PropTypes.number.isRequired,
  }

  defaultProps = {
    style: {},
  }

  componentDidMount() {
    const {
      width,
      height,
      min,
      max,
      resolution,
    } = this.props;

    let data = List(range(0, resolution)).map(() => 0);

    const elem = findDOMNode(this);
    const length = data.size;

    const x = d3.scale.linear()
      .domain([0, length - 1])
      .range([0, width - 40]);

    const y = d3.scale.linear()
      .domain([min, max])
      .range([height - 40, 0]);

    const line = d3.svg.line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    d3.select(elem)
      .datum(data.toJS())
      .attr('d', line);

    const tick = () => {
      const { reading } = this.props;

      data = data.push(reading);

      d3.select(elem)
        .datum(data.toJS())
        .attr('d', line)
        .attr('transform', null)
        .transition()
          .ease('linear')
          .duration(1000)
          .attr('transform', `translate(${ x(-1) })`)
          .each('end', tick);

      data = data.shift();
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

export default TransitionPath;
