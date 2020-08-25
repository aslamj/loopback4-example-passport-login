// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const passport = require('passport');
import {inject, Provider, bind, BindingScope} from '@loopback/core';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {ExpressRequestHandler} from '@loopback/rest';

@bind.provider({scope: BindingScope.SINGLETON})
export class TwitterOauth2ExpressMiddleware
  implements Provider<ExpressRequestHandler> {
  constructor(
    @inject('twitterStrategy')
    public twitterStrategy: TwitterStrategy,
  ) {
    passport.use(this.twitterStrategy);
  }

  value() {
    return passport.authenticate('twitter');
  }
}
