import React, { PropTypes } from 'react';

const ContentWrapper = ({ children }) => {
  return (
    <div style={ styles.base }>
      { children }
    </div>
  );
};

ContentWrapper.displayName = 'ContentWrapper';
ContentWrapper.propTypes = {
  /**
   * Children to render inside the wrapper
   */
  children: PropTypes.node,
};
ContentWrapper.defaultProps = {};

const styles = {
  base: {
    marginTop: '2rem',
    marginBottom: '4rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

export default ContentWrapper;
