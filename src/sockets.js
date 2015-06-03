var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var CONSTANTS = require('./constants');

function init() {
  server.listen(8080);

  console.log('Socket.io server running on http://localhost:8080');

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
