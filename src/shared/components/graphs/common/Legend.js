import React, { PropTypes } from 'react';
import { Map } from 'immutable';

const Legend = ({ gauges, style }) => {
  return (
    <div className="flex flex-center" style={{ ...styles.base, ...style }}>
      {
        gauges.map((i, idx) => {
          return (
            <div key={ idx } className="p1 flex-auto">
              <span style={{
                ...styles.legendBlock,
                backgroundColor: i.get('color'),
              }}></span> { i.get('title') }
            </div>
          );
        }).toList()
      }
    </div>
  );
};

Legend.displayName = 'Legend';
Legend.propTypes = {
  gauges: PropTypes.instanceOf(Map).isRequired,
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

export default Legend;
