import bodyParser from 'body-parser';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';

import configureRoutes from './routes';
import configureSocket from './socket';

const PORT = process.env.PORT || 8001;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.normalize(__dirname + '/../')));

if (!isProduction) {
  console.log('Not in production mode, compiling application using Webpack...');
  require('./utils/bundler')(app);
}

const server = http.createServer(app);
const io = socketIO.listen(server);

configureRoutes(app);
configureSocket(io);

server.listen(PORT);

console.log(`Server is running :: http://localhost:${ PORT }`);
