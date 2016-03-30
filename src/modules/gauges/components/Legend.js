import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

function mapStateToProps(state) {
  return {
    gauges: state.gauges.filter(i => !i.get('disabled')).toList(),
  };
}

function mapDispatchToProps() {
  return {};
}

const Legend = ({ gauges, style }) => {
  return (
    <div
      className="flex flex-center"
      style={{
        ...styles.base,
        ...style,
      }}>
      {
        gauges
          .map((i, idx) => {
            return (
              <div key={ idx } className="p1 flex-auto">
                <span style={{
                  ...styles.legendBlock,
                  backgroundColor: i.get('color'),
                }}></span> { i.get('title') }
              </div>
            );
          })
      }
    </div>
  );
};

Legend.displayName = 'Legend';
Legend.propTypes = {
  /**
   * CSS styles to pass along to the component
   */
  style: PropTypes.object,
  /**
   * The gauges to display in the legend
   */
  gauges: PropTypes.instanceOf(List),
};
Legend.defaultProps = {
  style: {},
};

const styles = {
  base: {
    fontWeight: 100,
    textTransform: 'uppercase',
    fontSize: '0.75rem',
  },
  legendBlock: {
    width: '0.75rem',
    height: '0.75rem',
    marginRight: '0.5rem',
    marginLeft: '1.5rem',
    display: 'inline-block',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
