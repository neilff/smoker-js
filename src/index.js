var convert = require('./util/convert');
var sockets = require('./sockets');

const sensorConfig = {
  pin: 'A0',
  freq: 100
};

console.log('NODE_ENV: ', process.env.NODE_ENV);

sockets.init();

if (process.env.NODE_ENV === 'dev') {
  console.log('Operating in dev mode');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInterval(function() {
    var tempF = getRandomInt(215, 230);
    var tempC = getRandomInt(100, 115);
    var tempK = getRandomInt(80, 95);

    var data = {
      tempF: tempF,
      tempC: tempC,
      tempK: tempK
    };

    console.log(data);

    sockets.emitTempUpdate(data);
  }, 1000);
} else {

var j5 = require('johnny-five');
var board = new j5.Board();

  board.on('ready', function() {
    var thermistor = new j5.Sensor(sensorConfig);
    var currentTemp = 0;

    console.log('board ready');

    thermistor.on('change', function onChange(err, thmVoltage) {
      if (err) {
        console.error(err);
      }

      currentTemp = convert.convertVoltToTemp(thmVoltage);
      console.log('Current TempF: ', currentTemp.tempF);

      sockets.emitTempUpdate(currentTemp);
    });
  });
}
