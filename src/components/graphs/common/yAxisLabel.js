import React, { Component, PropTypes } from 'react';
// import { findDOMNode } from 'react-dom';
// import d3 from 'd3';

class yAxisLabel extends Component {
  static propTypes = {
    fill: PropTypes.string,
  }

  componentDidMount() {
    console.log('hello world');
  }

  render() {
    // const fill = this.props.fill;

    return (
      <h1>Hello World</h1>
    );
  }
}

export default yAxisLabel;
