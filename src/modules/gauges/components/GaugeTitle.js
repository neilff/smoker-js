import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  const idx = ownProps.idx;

  return {
    title: state.gauges.getIn([idx, 'title']),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const idx = ownProps.idx;

  return {
    onUpdateTitle: (val) => dispatch(setTitle(idx, val)),
  };
}

import ContentEditable from 'shared/components/ui/ContentEditable';

const GaugeTitle = ({ title, onUpdateTitle }) => {
  return (
    <div
      style={ styles.title }
      className="h4 absolute">
      <ContentEditable
        onChange={ onUpdateTitle }
        html={ title } />
    </div>
  );
};

GaugeTitle.displayName = 'GaugeTitle';
GaugeTitle.propTypes = {
  /**
   * Current title of the gauge
   */
  title: PropTypes.string,
  /**
   * The update function for the gauge title
   */
  onUpdateTitle: PropTypes.func,
};
GaugeTitle.defaultProps = {};

const styles = {
  title: {
    bottom: 110,
    width: '100%',
    textTransform: 'uppercase',
    fontWeight: 100,
    fontSize: 14,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeTitle);
