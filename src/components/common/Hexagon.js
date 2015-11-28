import React from 'react';

const Hexagon = () => {
  return (
    <div style={ styles.base }>
      <span style={{ ...styles.before, ...styles.beforeAndAfter }}></span>
      <span style={{ ...styles.after, ...styles.beforeAndAfter }}></span>
    </div>
  );
};

const styles = {
  base: {
    backgroundColor: '#64C7CC',
    height: '129.90px',
    margin: '64.95px 0',
    position: 'relative',
    width: '225px',
  },
  beforeAndAfter: {
    position: 'absolute',
    width: '0',
    borderLeft: '112.5px solid transparent',
    borderRight: '112.5px solid transparent',
  },
  before: {
    bottom: '100%',
    borderBottom: '64.95px solid #64C7CC',
  },
  after: {
    borderTop: '64.95px solid #64C7CC',
    top: '100%',
    width: '0',
  },
};

export default Hexagon;
