import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { onConnected, onDisconnected } from 'modules/socket/actions';

function createConnection(dispatch) {
  const socket = io('//localhost:8001').connect();

  const socketActions = bindActionCreators({
    onConnected,
    onDisconnected,
  }, dispatch);

  socket.on('connected', socketActions.onConnected);
  socket.on('disconnect', socketActions.onDisconnected);
  socket.on('error', socketActions.onError);
  socket.on('reconnect', socketActions.onReconnect);
  socket.on('reconnecting', socketActions.onReconnecting);
  socket.on('reconnect_error', socketActions.onReconnectError);
  socket.on('reconnect_failed', socketActions.onReconnectFailed);

  socket.on('action', (action) => dispatch(action));

  return socket;
}

export default createConnection;
