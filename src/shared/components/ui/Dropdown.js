import React, { PropTypes } from 'react';

const Dropdown = ({ isVisible, children, style, className }) => {
  return (
    <div
      onClick={ (e) => e.stopPropagation() }
      className={ `absolute black left-align p1 bg-white ${ className }` }
      style={{
        ...styles.base,
        ...isVisible ? styles.visible : styles.hidden,
        ...style,
      }}>
      { children }
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  /**
   * Children to render inside the dropdown
   */
  children: PropTypes.node,
  /**
   * Class names to apply to the dropdown
   */
  className: PropTypes.string,
  /**
   * Whether the dropdown is visible or not
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * The styles to apply to the dropdown
   */
  style: PropTypes.object,
};
Dropdown.defaultProps = {
  className: '',
  isVisible: false,
  style: {},
};

const styles = {
  base: {
    minWidth: '180px',
    zIndex: 10,
  },
  hidden: {
    visibility: 'hidden',
    opacity: '0',
  },
  visible: {
    visibility: 'visible',
    opacity: '1',
  },
};

export default Dropdown;
