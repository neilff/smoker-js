import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import d3 from 'd3';
import { range } from 'ramda';

class TransitionPath extends Component {
  static propTypes = {
    reading: PropTypes.number.isRequired,
    style: PropTypes.object,
    resolution: PropTypes.number.isRequired,
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired,
  }

  defaultProps = {
    style: {},
  }

  componentDidMount() {
    const {
      x,
      y,
      resolution,
    } = this.props;

    let data = List(range(0, resolution)).map(() => 0);

    const elem = findDOMNode(this);

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
          .duration(250)
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
