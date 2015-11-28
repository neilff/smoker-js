import deviceMock from '../device/deviceMock';
import connectPhoton from '../device/photon';

export default function configureSocket(io) {
  io.on('connection', (socket) => {
    socket.emit('connected');
  });

  if (process.env.NODE_ENV !== 'production') {
    deviceMock(io);
  } else {
    connectPhoton(io);
  }
}
