import * as express from 'express';
import * as passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import {UserModel} from '../api/user/user';

// tslint:disable-next-line: no-any
type JwtPayload = {
  [key: string]: any
};

const setupPassport = (app: express.Application) => {
  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_JWT_SECRET,
  };

  const strategy = new JwtStrategy(
      jwtOptions, (payload: JwtPayload, done: VerifiedCallback) => {
        // TODO: Debug logging.
        UserModel.findOne({userID: payload.id})
            .then((user) => {
              done(null, user);
            })
            .catch((error: Error) => {
              done(error);
            });
      });

  passport.use(strategy);
  app.use(passport.initialize());
};

module.exports = setupPassport;
