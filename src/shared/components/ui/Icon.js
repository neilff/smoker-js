import React, { PropTypes } from 'react';

const Icon = ({ type, style, isVisible, onClick, className }) => {
  return (
    <span className={ `inline-block ${ className }` } style={ style } onClick={ onClick }>
      <i
        style={{
          ...styles.base,
          ...style,
          ...isVisible ? styles.visible : styles.hidden,
        }}
        className={ `icon ${ type }` }>
      </i>
    </span>
  );
};

Icon.displayName = 'Icon';
Icon.propTypes = {
  /**
   * Classes to apply to the icon
   */
  className: PropTypes.string,
  /**
   * Whether the icon is visible or not
   */
  isVisible: PropTypes.bool,
  /**
   * What to perform when clicked on
   */
  onClick: PropTypes.func,
  /**
   * Styles to apply to the icon
   */
  style: PropTypes.object,
  /**
   * The type of icon to display, refer to Ionicon classes - http://ionicons.com/
   */
  type: PropTypes.string.isRequired,
};
Icon.defaultProps = {
  className: '',
  isVisible: true,
  onClick: () => {},
  style: {},
};

const styles = {
  base: {
    fontSize: '1rem',
  },
  visible: {
    display: 'inline-block',
  },
  hidden: {
    display: 'none',
  },
};

export default Icon;
