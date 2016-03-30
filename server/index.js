require('babel-core/register');
require('babel-polyfill');
require('./server.js');

global.lastGaugeReading = {
  A: null,
  B: null,
  C: null,
};
