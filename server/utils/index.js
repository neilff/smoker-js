const sanitizer = require('sanitizer');

export function isDefined(val) {
  return val && typeof val !== 'undefined' && val !== null;
}

/**
 * Takes in voltage from thermistor and converts it to celcius, fahrenheit,
 * and kelvin measurements.
 *
 * See Derick Bailey's original post for the source of these conversions:
 * https://blog.safaribooksonline.com/2013/07/25/an-arduino-powered-bbq-thermometer/
 *
 * @param {integer} volt Voltage from thermistor
 * @return {object} Conversions for kelvin, celcius, fahrenheit
 */
export function convertVoltToTemp(volt) {
  var tempK;
  var tempC;
  var tempF;

  // Kelvin
  tempK = Math.log(10240000 / volt - 10000);
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) + (0.0000000876741 *
      tempK * tempK * tempK));

  // Celsius
  tempC = tempK - 273.15;
  tempC = Math.round(tempC * 10) / 10;

  // Fahrenheit
  tempF = (tempC * 1.8) + 32;
  tempF = Math.round(tempF * 10) / 10;

  return {
    tempK: tempK,
    tempC: tempC,
    tempF: tempF,
    volt: volt
  };
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function scrub(text) {
  if (isDefined(text)) {

    // clip the string if it is too long
    if (text.length > 65535) {
      text = text.substr(0,65535);
    }

    return text === false || text === true ?
      text :
      sanitizer.sanitize(text);
  } else {
    return null;
  }
}
