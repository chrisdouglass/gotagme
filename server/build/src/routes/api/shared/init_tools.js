var passport = require('passport');
// TODO: Convert to class.
var InitTools = {
    NotImplemented: function (req, res, next) {
        var err = new Error('Not Implemented');
        err.status = 501;
        next(err);
    },
    BasicAuthenticate: passport.authenticate('jwt', { session: false })
};
// TODO: Turn this into a proper module.
module.exports = InitTools;
