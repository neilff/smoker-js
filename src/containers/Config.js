import React from 'react';
import { connect } from 'react-redux';

import BarGraph from '../components/graphs/BarGraph';
import PieGraph from '../components/graphs/PieGraph';

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

const Config = () => {
  return (
    <div>
      <h1>Config</h1>

      <div>
        <BarGraph />
      </div>

      <div>
        <PieGraph percent={ 35 } />
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
