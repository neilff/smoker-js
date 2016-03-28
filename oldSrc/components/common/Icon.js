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
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
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
