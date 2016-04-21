import { fromJS, Map } from 'immutable';
import chalk from 'chalk';
import convertVoltToK from '../utils/convertVoltToK';
import { ON_TEMP_UPDATE, SOCKET_UPDATE_TIME, GAUGE_PINS } from '../../constants';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function connectMock(io) {
  console.log(chalk.blue.bold('Simulating Photon device...'));

  function sendAction(id, value) {
    io.sockets.emit('action', {
      type: ON_TEMP_UPDATE,
      payload: { id, value },
    });
  }

  let sensorStates = fromJS(GAUGE_PINS).reduce((acc, i) => {
    return acc.set(i, getRandomInt(245, 300));
  }, Map());

  setInterval(function() {
    sensorStates = sensorStates.map(i => i += Math.random() * getRandomInt(1, 4));
    sensorStates.forEach((i, idx) => sendAction(idx, i));

    console.log(sensorStates.toJS());

    global.lastGaugeReading = sensorStates.toJS();
  }, SOCKET_UPDATE_TIME);
}
