import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../components/ui/ContentWrapper';
import Navigator from '../components/navigator/Navigator';

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

const App = ({ children }) => {
  return (
    <main>
      <Navigator />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </main>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
