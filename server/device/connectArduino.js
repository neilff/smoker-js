import superagent from 'superagent';
import convertVoltToK, { convertVoltToTemp } from '../utils/convertVoltToK';
import { ON_TEMP_UPDATE, GAUGE_PINS } from '../../constants';

const ARDUINO_BASE_URL = 'http://smokerjs.local/arduino/analog/';

export default function initArduino(io) {
  function sendAction(id, value) {
    io.sockets.emit('action', {
      type: ON_TEMP_UPDATE,
      payload: { id, value },
    });
  }

  function makeRequest(pinId) {
    console.log(ARDUINO_BASE_URL + pinId);
    return superagent.get(ARDUINO_BASE_URL + pinId);
  }

  function loopArduino(pinId) {
    console.log(`Starting request (${ pinId })`);

    makeRequest(pinId)
      .end(function(err, res) {
        if (err) {
          console.log('Error :: ', err);
        }

        const { pin, value } = res.body;
        const valueK = convertVoltToK(value);

        console.log(`Request Resolved (${ pinId }) :: `, convertVoltToTemp(value));

        sendAction(res.body.pin, valueK);

        global.lastGaugeReading[pinId] = valueK;

        loopArduino(pinId);
      });
  }

  GAUGE_PINS.forEach(pinId => loopArduino(pinId));
}
