require('dotenv').load();  // Load env as early as possible.
require('mongoose').Promise = require('bluebird');

import { Server } from './server/server';

const app = new Server(process.env.NODE_ENV, process.env.SERVER_PORT);
app.setup();
app.start();
