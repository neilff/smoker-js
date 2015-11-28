import { convertVoltToK } from '../utils';
import { ON_TEMP_UPDATE } from '../../shared';
import { TIME_FREQ } from '../config';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function deviceMock(io) {
  console.log('Simulating Photon device...');

  var mockStateA = getRandomInt(245, 300);
  var mockStateB = getRandomInt(285, 315);
  var mockStateC = getRandomInt(255, 305);

  setInterval(function() {
    // mockStateA = getRandomInt(325, 455);
    // mockStateB = getRandomInt(325, 455); // += Math.random() / getRandomInt(2, 5);
    // mockStateC = getRandomInt(325, 455); // += Math.random() / getRandomInt(2, 5);

    mockStateA += Math.random() / getRandomInt(2, 5);
    mockStateB += Math.random() / getRandomInt(2, 5);
    mockStateC += Math.random() / getRandomInt(2, 5);

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
