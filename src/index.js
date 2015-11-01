'use strict';

const invariant = require('invariant');
const convert = require('./util/convert');
const sockets = require('./sockets');

const PARTICLE_TOKEN = process.env.PARTICLE_TOKEN;
const PARTICLE_DEVICE_ID = process.env.PARTICLE_DEVICE_ID;

const sensorConfig = {
  pin: 'A0',
  freq: 1000
};

console.log('NODE_ENV :: ', process.env.NODE_ENV);

sockets.init();

if (process.env.NODE_ENV === 'DEV') {
  console.log('Operating in DEV mode');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInterval(function() {
    const tempF = getRandomInt(215, 230);
    const tempC = getRandomInt(100, 115);
    const tempK = getRandomInt(80, 95);

    const currentTemp = {
      tempF: tempF,
      tempC: tempC,
      tempK: tempK
    };

    console.log('currentTemp :: ', currentTemp);

    sockets.emitTempUpdate(currentTemp);
  }, 1000);
} else {
  invariant(
    PARTICLE_TOKEN,
    'Particle Token not provided, please set the PARTICLE_TOKEN envirnment variable.'
  );

  invariant(
    PARTICLE_DEVICE_ID,
    'Particle Device ID not provided, please set the PARTICLE_DEVICE_ID envirnment variable.'
  );

  const j5 = require('johnny-five');
  const Particle = require('particle-io');
  const board = new j5.Board({
    io: new Particle({
      token: PARTICLE_TOKEN,
      deviceId: PARTICLE_DEVICE_ID
    })
  });

  board.on('ready', function() {
    const thermistor = new j5.Sensor('A0');
    let currentTemp = 0;

    console.log('Board Ready');

    this.analogRead('A1', function(data) {
      currentTemp = convert.convertVoltToTemp(data);
      console.log('currentTemp :: ', currentTemp);

      sockets.emitTempUpdate(currentTemp);
    });
  });
}
