var j5 = require('johnny-five');
var board = new j5.Board();
var convert = require('./util/convert');

var sensorConfig = {
  pin: 'A0',
  freq: 25
};

board.on('ready', function(){
  var thermistor = new j5.Sensor(sensorConfig);
  var currentTemp = 0;

  console.log('board ready');

  thermistor.on('change', function onChange(err, thmVoltage) {
    if (err) {
      console.error(err);
    }

    currentTemp = convert.convertVoltToTemp(thmVoltage);
    console.log('Current TempF: ', currentTemp.tempF);
  });
});

