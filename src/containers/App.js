import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

const App = ({ children }) => {
  return (
    <div>
      <h1>App</h1>
      { children }
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
