import chalk from 'chalk';
import convertVoltToK from '../utils/convertVoltToK';
import { ON_TEMP_UPDATE, SOCKET_UPDATE_TIME } from '../../constants';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function connectMock(io) {
  console.log(chalk.blue.bold('Simulating Photon device...'));

  var mockStateA = getRandomInt(245, 300);
  var mockStateB = getRandomInt(285, 315);
  var mockStateC = getRandomInt(255, 305);

  setInterval(function() {
    mockStateA += Math.random() * getRandomInt(1, 4);
    mockStateB += Math.random() * getRandomInt(1, 4);
    mockStateC += Math.random() * getRandomInt(1, 4);

    // mockStateA += Math.random() / getRandomInt(2, 5);
    // mockStateB += Math.random() / getRandomInt(2, 5);
    // mockStateC += Math.random() / getRandomInt(2, 5);

    const payload = {
      A: mockStateA,
      B: mockStateB,
      C: mockStateC,
    };

    io.sockets.emit('action', {
      type: ON_TEMP_UPDATE,
      payload,
    });

    global.lastGaugeReading = payload;
  }, SOCKET_UPDATE_TIME);
}
