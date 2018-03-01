require('dotenv').load();  // Load env as early as possible.
global.Promise = require('bluebird').Promise;
require('mongoose').Promise = global.Promise;

import {Server} from './server/server';

const app = new Server(process.env.NODE_ENV, process.env.SERVER_PORT);
app.setup();
app.start();
