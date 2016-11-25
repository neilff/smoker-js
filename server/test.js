const request = require('request');

const ARDUINO_URL = process.env.URL || 'http://smokerjs.local/arduino/analog/0';

function convertVoltToTemp(volt){
  var tempK, tempC, tempF;

  // get the Kelvin temperature
  tempK = Math.log(((10240000/volt) - 10000));
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) + (0.0000000876741 *
      tempK * tempK * tempK));

  // convert to Celsius and round to 1 decimal place
  tempC = tempK - 273.15;
  tempC = Math.round(tempC*10)/10;

  // get the Fahrenheit temperature, rounded
  tempF = (tempC * 1.8) + 32;
  tempF = Math.round(tempF*10)/10;

  // return all three temperature scales
  return {
    tempK: tempK,
    tempC: tempC,
    tempF: tempF
  };
}

console.log('starting longpoll');

setInterval(() => {
  request(ARDUINO_URL, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      const parse = body.replace('Pin A0 reads analog ', '');
      const reading = parseInt(parse);

      console.log('reading', reading);
      console.log('temp', convertVoltToTemp(reading));

    } else {
      console.log(error);
    }

    // const parse = JSON.parse(res.body).result;

    // console.log(parse);
    // console.log(convertVoltToTemp(parseInt(parse)));
  });
}, 2000);
