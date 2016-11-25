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

export function convertVoltToTemp(volt) {
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
