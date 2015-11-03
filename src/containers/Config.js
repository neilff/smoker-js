import React from 'react';
import { connect } from 'react-redux';

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
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
