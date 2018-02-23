const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require('../routes/api/user/user');

const setupPassport = function(app) {
  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = process.env.PASSPORT_JWT_SECRET;

  const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    // TODO: Debug log.
    //console.log('Payload received:', jwt_payload);
    User.findOne({userID: jwt_payload.id}).then((user) => {
      done(null, user);
    }).catch((err) => {
      done(err);
    });
  });

  passport.use(strategy);
  app.use(passport.initialize());
};

module.exports = setupPassport;
