import { convertVoltToK } from '../utils';
import { ON_TEMP_UPDATE } from '../../shared';
import { TIME_FREQ } from '../config';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function deviceMock(io) {
  console.log('Simulating Photon device...');

  var mockStateA = getRandomInt(285, 315);
  var mockStateB = getRandomInt(285, 315);
  var mockStateC = getRandomInt(285, 315);

  setInterval(function() {
    mockStateA += Math.random() / getRandomInt(50, 100);
    mockStateB += Math.random() / getRandomInt(50, 100);
    mockStateC += Math.random() / getRandomInt(50, 100);

    io.sockets.emit('message', {
      type: ON_TEMP_UPDATE,
      payload: {
        A: mockStateA,
        B: mockStateB,
        C: mockStateC,
      }
    });
  }, TIME_FREQ);
}
