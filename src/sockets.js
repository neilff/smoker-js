'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const CONSTANTS = require('./constants');
const PORT = process.env.PORT || 8080;

function init() {
  server.listen(PORT);

  console.log(`Socket.io server running on http://localhost:${ PORT }`);

  io.on('connection', function(socket) {
    socket.emit(CONSTANTS.CONNECTED, {
      connected: true
    });
  });
}

function emitTempUpdate(currentTemp) {
  io.sockets.emit(CONSTANTS.TEMP_UPDATE, currentTemp);
}

module.exports = {
  init: init,
  emitTempUpdate: emitTempUpdate
};
