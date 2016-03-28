import io from 'socket.io-client';

const socket = io('//localhost:8001').connect();

export default socket;
