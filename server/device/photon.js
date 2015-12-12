import five from 'johnny-five';
import Particle from 'particle-io';
import invariant from 'invariant';
import { ON_TEMP_UPDATE, SOCKET_UPDATE_TIME } from '../../shared';
import { convertVoltToK } from '../utils';

const PARTICLE_TOKEN = process.env.PARTICLE_TOKEN;
const PARTICLE_DEVICE_ID = process.env.PARTICLE_DEVICE_ID;

export default function connectPhoton(io) {
  invariant(
    PARTICLE_TOKEN,
    'Particle Token not provided, please set the PARTICLE_TOKEN envirnment variable.'
  );

  invariant(
    PARTICLE_DEVICE_ID,
    'Particle Device ID not provided, please set the PARTICLE_DEVICE_ID envirnment variable.'
  );

  const board = new five.Board({
    io: new Particle({
      token: PARTICLE_TOKEN,
      deviceId: PARTICLE_DEVICE_ID
    })
  });

  console.log('Connecting to Photon...');

  board.on('ready', function() {
    console.log('Photon Ready!');

    var sensor = new five.Sensor({
      pin: 'A1',
      freq: SOCKET_UPDATE_TIME
    });

    sensor.on('change', function() {
      const val = this.value;

      io.sockets.emit('message', {
        type: ON_TEMP_UPDATE,
        payload: convertVoltToK(val)
      });
    });
  });
}
