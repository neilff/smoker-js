import React, { PropTypes } from 'react';

import Circle from 'components/ui/Circle';

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div>
      Connection Status:
      <Circle
        width={ 16 }
        filled={ true }
        color={ isConnected ? 'lightblue' : 'orange' } />
    </div>
  );
};

ConnectionStatus.displayName = 'ConnectionStatus';
ConnectionStatus.propTypes = {
  /**
   * Whether the socket connection is live or not
   */
  isConnected: PropTypes.bool,
};
ConnectionStatus.defaultProps = {
  isConnected: false,
};

export default ConnectionStatus;
