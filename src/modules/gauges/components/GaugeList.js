import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

function mapStateToProps(state) {
  return {
    gauges: state.gauges.map(i => i.get('id')).toList(),
  };
}

function mapDispatchToProps() {
  return {};
}

import Column from 'shared/components/ui/Column';
import Gauge from 'modules/gauges/components/Gauge';

const GaugeList = ({ gauges }) => {
  return (
    <div className="flex flex-auto">
      {
        gauges.map(i => {
          return (
            <Column
              className="flex-auto"
              key={ i }>
              <Gauge idx={ i } />
            </Column>
          );
        })
      }
    </div>
  );
};

GaugeList.displayName = 'GaugeList';
GaugeList.propTypes = {
  /**
   * The list of the gauge ids
   */
  gauges: PropTypes.instanceOf(List),
};
GaugeList.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeList);
