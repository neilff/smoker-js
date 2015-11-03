import { getRandomInt } from '../utils';
import { ON_TEMP_UPDATE } from '../../shared';

export default function deviceMock(io) {
  console.log('Simulating Photon device...');

  setInterval(function() {
    const currentTemp = {
      tempF: getRandomInt(215, 230),
      tempC: getRandomInt(100, 115),
      tempK: getRandomInt(80, 95)
    };

    console.log('currentTemp :: ', currentTemp);

    io.sockets.emit('message', {
      type: ON_TEMP_UPDATE,
      payload: currentTemp
    });
  }, 1000);
}
