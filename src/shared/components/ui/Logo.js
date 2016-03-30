import React, { PropTypes } from 'react';

const Logo = ({ className, style }) => {
  return (
    <span
      className={ `${ className }` }
      style={{
        ...styles.base,
        ...style,
      }}>
      Smoker.js
    </span>
  );
};

Logo.displayName = 'Logo';
Logo.propTypes = {
  /**
   * Styles to apply to the logo
   */
  style: PropTypes.object,
  /**
   * Classes to apply to the logo
   */
  className: PropTypes.string,
};
Logo.defaultProps = {
  style: {},
  className: '',
};

const styles = {
  base: {
    color: '#ddd',
    fontSize: '1.25rem',
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
};

export default Logo;
