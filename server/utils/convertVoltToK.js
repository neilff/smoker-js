/**
 * Takes in voltage and converts it to Kelvin.
 *
 * @param {integer} volt Voltage from thermistor
 * @return {object} Conversion to kelvin
 */
export default function convertVoltToK(volt) {
  let tempK;

  // Kelvin
  tempK = Math.log(10240000 / volt - 10000);
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) +
          (0.0000000876741 * tempK * tempK * tempK));

  return tempK;
}
