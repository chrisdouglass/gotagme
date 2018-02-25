// Manages all routes.
import express = require('express');
const router = express.Router();

// All API routes.
const api = require('./api');
router.use('/api', api);

router.use('/', (req: express.Request, res: express.Response) => {
  res.render('index', {title: 'Hey', message: 'Hello there!'});
});

module.exports = router;
