import { getRandomInt, convertVoltToK } from '../utils';
import { ON_TEMP_UPDATE } from '../../shared';
import { TIME_FREQ } from '../config';

export default function deviceMock(io) {
  console.log('Simulating Photon device...');

  setInterval(function() {
    io.sockets.emit('message', {
      type: ON_TEMP_UPDATE,
      payload: {
        A: convertVoltToK(getRandomInt(550, 575)),
        B: convertVoltToK(getRandomInt(550, 575)),
        C: convertVoltToK(getRandomInt(550, 575)),
      }
    });
  }, TIME_FREQ);
}
