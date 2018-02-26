require('dotenv').load();  // Load env as early as possible.
require('mongoose').Promise = require('bluebird');

const server = require('./server');
const app = new server.App(process.env.NODE_ENV, process.env.SERVER_PORT);
app.setup();
app.start();
