import React, { PropTypes } from 'react';

const Row = ({ children, className = '' }) => {
  return (
    <div style={ styles.base } className={ `flex flex-stretch ${ className }` }>
      { children }
    </div>
  );
};

Row.displayName = 'Row';
Row.propTypes = {
  /**
   * The children to render inside the row
   */
  children: PropTypes.node,
  /**
   * Classes to apply to the row
   */
  className: PropTypes.string,
};
Row.defaultProps = {
  className: '',
};

const styles = {
  base: {
    maxWidth: '1024px',
    margin: '0 auto',
  },
};

export default Row;
