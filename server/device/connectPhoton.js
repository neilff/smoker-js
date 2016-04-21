import five from 'johnny-five';
import Particle from 'particle-io';
import invariant from 'invariant';
import convertVoltToK from '../utils/convertVoltToK';
import { ON_TEMP_UPDATE, SOCKET_UPDATE_TIME, GAUGE_PINS } from '../../constants';
import { PARTICLE_TOKEN, PARTICLE_DEVICE_ID } from '../../config.json';

export default function connectPhoton(io) {
  invariant(
    PARTICLE_TOKEN,
    'Particle Token not provided, please set the PARTICLE_TOKEN envirnment variable.'
  );

  invariant(
    PARTICLE_DEVICE_ID,
    'Particle Device ID not provided, please set the PARTICLE_DEVICE_ID envirnment variable.'
  );

  function sendAction(id) {
    return function() {
      const { value } = this;

      io.sockets.emit('action', {
        type: ON_TEMP_UPDATE,
        payload: {
          id,
          value: convertVoltToK(value),
        },
      });
    }
  }

  const board = new five.Board({
    io: new Particle({
      token: PARTICLE_TOKEN,
      deviceId: PARTICLE_DEVICE_ID
    })
  });

  console.log('Connecting to Photon...');

  board.on('ready', () => {
    console.log('Photon Ready!');

    const sensors = GAUGE_PINS.reduce((acc, idx) => {
      acc[idx] = new five.Sensor({ pin: idx, freq: SOCKET_UPDATE_TIME });

      return acc;
    }, {});

    GAUGE_PINS.forEach(idx => sensors[idx].on('change', sendAction(idx)));
  });
}
