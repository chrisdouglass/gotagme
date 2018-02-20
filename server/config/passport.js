const setupPassport = function(app) {
  const passport = require('passport');
  const passportJWT = require('passport-jwt');

  const ExtractJwt = passportJWT.ExtractJwt;
  const JwtStrategy = passportJWT.Strategy;

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = process.env.PASSPORT_JWT_SECRET;

  const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log('Payload received:', jwt_payload);
    // TODO: Perform database call and return a user. done(error, user, info)
    done();
  });

  passport.use(strategy);
  app.use(passport.initialize());
};

module.exports = setupPassport;
