import React, { PropTypes } from 'react';

const ConnectionStatus = ({ connected }) => {
  return (
    <div
      style={ styles }
      className="absolute">
      { connected ? 'Connected' : 'Disconnected' }
    </div>
  );
};

ConnectionStatus.displayName = 'ConnectionStatus';
ConnectionStatus.propTypes = {
  /**
   * Whether the socket connection is live or not
   */
  connected: PropTypes.bool,
};
ConnectionStatus.defaultProps = {
  connected: false,
};

const styles = {
  bottom: -20,
  left: 0,
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 100,
  color: '#777',
};

export default ConnectionStatus;
