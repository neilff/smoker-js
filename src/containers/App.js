import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../components/common/ContentWrapper';
import Navigator from '../components/navigator/Navigator';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const App = ({ children }) => {
  return (
    <main>
      <Navigator />
      <ContentWrapper>
        { children }
      </ContentWrapper>
    </main>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
