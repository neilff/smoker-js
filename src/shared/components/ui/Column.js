import React, { PropTypes } from 'react';

const Column = ({ children, className }) => {
  return (
    <div className={ `m1 p1 ${ className }` }>{ children }</div>
  );
};

Column.displayName = 'Column';
Column.propTypes = {
  /**
   * Children to render inside the column
   */
  children: PropTypes.node,
  /**
   * Classes to apply to the column
   */
  className: PropTypes.string,
};
Column.defaultProps = {};

export default Column;
