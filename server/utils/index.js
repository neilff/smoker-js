const sanitizer = require('sanitizer');

export function isDefined(val) {
  return val && typeof val !== 'undefined' && val !== null;
}

/**
 * Takes in voltage and converts it to Kelvin.
 *
 * @param {integer} volt Voltage from thermistor
 * @return {object} Conversion to kelvin
 */
export function convertVoltToK(volt) {
  let tempK;

  // Kelvin
  tempK = Math.log(10240000 / volt - 10000);
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) +
          (0.0000000876741 * tempK * tempK * tempK));

  return tempK;
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
