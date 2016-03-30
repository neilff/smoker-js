import React, { PropTypes } from 'react';

const TemperatureWarning = ({ children, className, style, isVisible }) => {
  const warningStyle = isVisible ?
    styles.isVisible :
    styles.isHidden;

  return (
    <div
      style={{ ...styles.base, ...warningStyle, ...style }}
      className={ `h6 p1 center ${ className }` }>
      { children }
    </div>
  );
};

TemperatureWarning.displayName = 'TemperatureWarning';
TemperatureWarning.propTypes = {
  /**
   * The content to render inside the warning
   */
  children: PropTypes.node,
  /**
   * CSS classes to pass onto the component
   */
  className: PropTypes.string,
  /**
   * CSS styles to pass onto the component
   */
  style: PropTypes.object,
  /**
   * Whether the component is visible or not
   */
  isVisible: PropTypes.bool,
};
TemperatureWarning.defaultProps = {
  className: '',
  style: {},
};

const styles = {
  base: {
    transition: 'all 250ms',
    margin: '0 0 0.5rem',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  isVisible: {
    visibility: 'visible',
    opacity: 1,
  },
  isHidden: {
    visibility: 'hidden',
    opacity: 0,
  },
};

export default TemperatureWarning;
