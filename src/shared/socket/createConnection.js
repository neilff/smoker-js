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
  socket.on('action', (action) => dispatch(action));

  // For debugging purposes
  socket.on('error', (params) => console.info('Socket.io :: connection error', params));
  socket.on('reconnect', (params) => console.info('Socket.io :: successful reconnection', params));
  socket.on('reconnecting', (params) => console.info('Socket.io :: attempting to reconnect', params));
  socket.on('reconnect_error', (params) => console.info('Socket.io :: reconnection attempt error', params));
  socket.on('reconnect_failed', () => console.info('Socket.io :: couldn’t reconnect'));

  return socket;
}

export default createConnection;
