import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import {Strategy as TwitterStrategy} from 'passport-twitter';

import {Account} from '../../model/account/account';
import {User} from '../../model/user/user';
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

  const twitterStategy = new TwitterStrategy(
      {
        // TODO: Replace values with config object.
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_DEV_CALLBACK,
      },
      (token, tokenSecret, profile, callback) => {
        store.userForOAuthKeys(token, tokenSecret, true)
            .then((user: User|null) => {
              if (!user) {
                callback(new Error('Unable to upsert a new user.'));
                return;
              }

              const account: Account|undefined =
                  user.accountWithOAuthKeys(token, tokenSecret);
              if (account) {
                account.updateFromTwitterProfile(profile);
              }
              callback(null, user);
            });
      });

  // Additional serialization for Twitter.
  passport.serializeUser((user: User, done: Function) => {
    done(null, user.userID);
  });

  passport.deserializeUser((userID: string, done: Function) => {
    store.userForUserID(userID).then((user: User|null) => {
      if (!user) {
        done(new Error('Error deserializing user with ID ' + userID), null);
      }
      done(null, user);
    });
  });

  passport.use(jwtStrategy);
  passport.use(twitterStategy);
  app.use(passport.initialize());
};

module.exports = setupPassport;
