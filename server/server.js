import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import logmap from './utils/logger';
import config from '../config.json';
import connectMock from './device/connectMock';
import connectPhoton from './device/connectPhoton';
import connectArduino from './device/connectArduino';
import invariant from 'invariant';
import { SOCKET_UPDATE_TIME, GAUGE_PINS } from '../constants';

const PORT = process.env.PORT || 8001;
const NODE_ENV = process.env.NODE_ENV || 'production';
const DEVICE_TYPE = process.env.DEVICE_TYPE || 'mock';

invariant(
  DEVICE_TYPE === 'mock' || DEVICE_TYPE === 'photon' || DEVICE_TYPE === 'arduino',
  'The DEVICE_TYPE environment variable is incorrectly set.'
);

const app = express();

// Setup lastGaugeReading global to store readings
global.lastGaugeReading = GAUGE_PINS.reduce((acc, i) => {
  acc[i] = null;

  return acc;
}, {});

// Configure Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/dist', express.static(path.join(__dirname, '..', '/dist')));
app.use('/public', express.static(path.join(__dirname, '..', '/dist')));

// Compile webpack bundle in development
if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('../webpack.config');

  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

// Send index.html when root url is requested
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

const server = http.createServer(app);
const io = socketIO.listen(server);

logmap({
  'Smoker.js Online': null,
  'Address:': `http://localhost:${ PORT }`,
  'NODE_ENV:': NODE_ENV,
  'DEVICE_TYPE': DEVICE_TYPE,
  'SOCKET_UPDATE_TIME': SOCKET_UPDATE_TIME,
  'config.json:': JSON.stringify(config, null, 2),
});

// Send welcome message to connections
io.on('connection', (socket) => socket.emit('connected', global.lastGaugeReading));

const createDeviceConnection = (() => {
  switch (DEVICE_TYPE) {
    case 'arduino':
      return connectArduino

    case 'photon':
      return connectPhoton;

    default:
      return connectMock;
  }
})();

createDeviceConnection(io);

server.listen(PORT);
