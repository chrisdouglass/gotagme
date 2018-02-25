var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var User = require('../routes/api/user/user');
var setupPassport = function (app) {
    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.PASSPORT_JWT_SECRET;
    var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
        // TODO: Debug log.
        //console.log('Payload received:', jwt_payload);
        User.findOne({ userID: jwt_payload.id }).then(function (user) {
            done(null, user);
        })["catch"](function (err) {
            done(err);
        });
    });
    passport.use(strategy);
    app.use(passport.initialize());
};
module.exports = setupPassport;
