import React from 'react';
import { connect } from 'react-redux';

import BarGraph from '../components/graphs/BarGraph';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const Config = () => {
  return (
    <div>
      <h1>Config</h1>

      <div>
        <BarGraph />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
