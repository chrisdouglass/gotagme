// APIs for working with Users.
import * as express from 'express';
const router: express.Router = express.Router();

const registerAPI = require('./register_api.js');
router.use('/register', registerAPI);

// const user = require('./user_api.js');
// router.use('/', user);

module.exports = router;
