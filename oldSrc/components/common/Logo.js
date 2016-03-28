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
  style: PropTypes.object,
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
