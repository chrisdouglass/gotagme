import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback} from 'passport-jwt';

import {UserStore} from '../../store/user.store';

// tslint:disable-next-line: no-any
type JwtPayload = {
  [key: string]: {}
};

const setupPassport = (app: express.Application, conn: mongoose.Connection) => {
  const store = new UserStore(conn);

  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_JWT_SECRET,
  };

  const jwtStrategy = new JwtStrategy(
      jwtOptions, (payload: JwtPayload, done: VerifiedCallback) => {
        // TODO: Debug logging.
        store.findOne({userID: payload.id})
            .then((user) => {
              done(null, user);
            })
            .catch((error) => {
              done(error);
            });
      });

  passport.use(jwtStrategy);
  app.use(passport.initialize());
};

module.exports = setupPassport;