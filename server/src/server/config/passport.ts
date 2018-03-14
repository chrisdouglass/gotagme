import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback} from 'passport-jwt';

import {UserStore} from '../../store/user.store';

type JwtPayload = {
  [key: string]: {}
};

export function setupPassport(
    app: express.Application, conn: mongoose.Connection): void {
  const store: UserStore = new UserStore(conn);

  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_JWT_SECRET,
  };

  const jwtStrategy = new JwtStrategy(
      jwtOptions, (payload: JwtPayload, done: VerifiedCallback) => {
        // TODO: Debug logging.
        store.findOneByUserID(payload.id as string)
            .then((user) => {
              done(null, user);
            })
            .catch((error) => {
              done(error);
            });
      });

  passport.use(jwtStrategy);
  app.use(passport.initialize());
}
