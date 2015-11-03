import convertTempToK from './convertTempToK';

/**
 * Takes in voltage and converts it to Celcius.
 *
 * @param {integer} volt Voltage from thermistor
 * @return {object} Conversion to celcius
 */
export default function convertVoltToC(volt) {
  let tempC;

  // Celsius
  tempC = convertTempToK(volt) - 273.15;
  tempC = Math.round(tempC * 10) / 10;

  return tempC;
}
