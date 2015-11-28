/**
 * Takes in kelvin and converts it to Fahrenheit.
 *
 * @param {integer} K Kelvin
 * @return {object} Conversion to fahrenheit
 */
export function convertKelvinToF(K) {
  let tempF;

  // Fahrenheit
  tempF = (K - 273.15) * 1.8000 + 32.00;
  tempF = Math.round(tempF * 10) / 10;

  return tempF;
}

/**
 * Takes in kelvin and converts it to Celcius.
 *
 * @param {integer} K Kelvin
 * @return {object} Conversion to celcius
 */
export function convertKelvinToC(K) {
  let tempC;

  // Celsius
  tempC = K - 273.15;
  tempC = Math.round(tempC * 10) / 10;

  return tempC;
}

/**
 * Takes in fahrenheit and converts it to Kelvin.
 *
 * @param {integer} F Fahrenheit
 * @return {object} Conversion to kelvin
 */
export function convertFahrenheitToK(F) {
  let tempK;

  // Kelvin
  tempK = ((F - 32) / 1.8) + 273.15;
  tempK = Math.round(tempK * 10) / 10;

  return tempK;
}

/**
 * Takes in celcius and converts it to Kelvin.
 *
 * @param {integer} C Celcius
 * @return {object} Conversion to kelvin
 */
export function convertCelciusToK(C) {
  let tempK;

  // Kelvin
  tempK = C + 273.15;
  tempK = Math.round(tempK * 10) / 10;

  return tempK;
}

export function convertValue(value) {
  return (value / 100) * 2 * Math.PI;
}

export function calculateDonutArc(width, radius) {
  return d3.svg.arc()
    .outerRadius(width / 2)
    .innerRadius((width / 2) - radius)
    .startAngle(0);
}
