import convertTempToC from './convertTempToC';

/**
 * Takes in voltage and converts it to Fahrenheit.
 *
 * @param {integer} volt Voltage from thermistor
 * @return {object} Conversion to fahrenheit
 */
export default function convertVoltToF(volt) {
  let tempF;

  // Fahrenheit
  tempF = (convertTempToC(volt) * 1.8) + 32;
  tempF = Math.round(tempF * 10) / 10;

  return tempF;
}
