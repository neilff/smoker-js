import React, { PropTypes } from 'react';

const NavigatorItem = ({ children, className }) => {
  return (
    <div
      style={ styles.base }
      className={ `icon white ${ className }` }>
      { children }
    </div>
  );
};

NavigatorItem.displayName = 'NavigatorItem';
NavigatorItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
NavigatorItem.defaultProps = {
  className: '',
};

const styles = {
  base: {
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 150ms',
  },
};

export default NavigatorItem;
