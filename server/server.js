import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import { logmap } from './utils/logger';
import config from '../config.json';
import connectMock from './device/connectMock';
import connectPhoto from './device/connectPhoton';
import { SOCKET_UPDATE_TIME } from '../constants';

const PORT = process.env.PORT || 8001;
const NODE_ENV = process.env.NODE_ENV || 'production';

const app = express();

// Configure Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/dist', express.static('dist'));
app.use(express.static(__dirname + '/public'));

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
  'PARTICLE_TOKEN': process.env.PARTICLE_TOKEN,
  'PARTICLE_DEVICE_ID': process.env.PARTICLE_DEVICE_ID,
  'SOCKET_UPDATE_TIME': SOCKET_UPDATE_TIME,
  'config.json:': JSON.stringify(config, null, 2),
});

// Send welcome message to connections
io.on('connection', (socket) => socket.emit('connected', global.lastGaugeReading));

// In development, mock the device, in production attempt to connect to the Photon
const createDeviceConnection = NODE_ENV !== 'production' ? connectMock : connectPhoto;

createDeviceConnection(io);

server.listen(PORT);
