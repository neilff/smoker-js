import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import d3 from 'd3';

class AnimatedFixedPath extends Component {
  static propTypes = {
    endAngle: PropTypes.number.isRequired,
    arc: PropTypes.func.isRequired,
    fill: PropTypes.string,
  }

  componentDidMount() {
    const elem = findDOMNode(this);

    // On init, set the initial value
    d3.select(elem)
      .datum({
        endAngle: this.props.endAngle,
      })
      .attr('d', this.props.arc);
  }

  componentDidUpdate() {
    const elem = findDOMNode(this);
    const endAngle = this.props.endAngle;

    // On update, transition to the updated value
    d3.select(elem)
      .transition()
      .attrTween('d', (d) => {
        const interpolate = d3.interpolate(d.endAngle, endAngle);

        return (t) => {
          d.endAngle = interpolate(t);
          return this.props.arc(d);
        };
      });
  }

  render() {
    const fill = this.props.fill;

    return (
      <path fill={ fill }></path>
    );
  }
}

export default AnimatedFixedPath;
