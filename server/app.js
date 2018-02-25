require('dotenv').load();  // Load env as early as possible.
// Set the promises used by Mongoose.
require('mongoose').Promise = require('bluebird');

const server = require('./build/src/server');
const app = new server.App();
app.setup();
app.start();
