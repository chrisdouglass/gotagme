require('dotenv').load();  // Load env as early as possible.
require('mongoose').Promise = require('bluebird');

const server = require('./build/src/server');
const app = new server.App();
app.setup();
app.start();
